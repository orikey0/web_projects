
import cv2
import numpy as np
from scipy.spatial import distance

def density_heatmap(image, box_centers, radias=100):
    import matplotlib.pyplot as plt
    from colour import Color
    density_range = 100
    gradient = np.linspace(0, 1, density_range)
    img_width = image.shape[1]
    img_height = image.shape[0]
    density_map = np.zeros((img_height, img_width))
    color_map = np.empty([img_height, img_width, 3], dtype=int)
    # get gradient color using rainbow
    cmap = plt.get_cmap("rainbow") # 使用matplotlib获取颜色梯度
    blue = Color("blue") # 使用Color来生成颜色梯度
    hex_colors = list(blue.range_to(Color("red"), density_range))
    rgb_colors = [[rgb * 255 for rgb in color.rgb] for color in hex_colors][::-1]
    for i in range(img_height):
        for j in range(img_width):
            for box in box_centers:
                dist = distance.euclidean(box, (j, i))
                if dist <= radias * 0.25:
                    density_map[i][j] += 10
                elif dist <= radias:
                    density_map[i][j] += (radias - dist) / (radias * 0.75) * 10
            ratio = min(density_range-1, int(density_map[i][j]))
            for k in range(3):
                # color_map[i][j][k] = int(cmap(gradient[ratio])[:3][k]*255)
                color_map[i][j][k] = rgb_colors[ratio][k]
    return color_map

def use_heatmap(image, box_centers):
    import heatmap
    hm = heatmap.Heatmap()
    box_centers = [(i, image.shape[0] - j) for i, j in box_centers]
    img = hm.heatmap(box_centers, dotsize=200, size=(image.shape[1], image.shape[0]), opacity=128, area=((0, 0), (image.shape[1], image.shape[0])))
    return img

def get_img():   
    vc = cv2.VideoCapture(r'./testVideo.mp4') #读入视频文件
    c=1
    
    if vc.isOpened(): #判断是否正常打开
        rval , frame = vc.read()
    else:
        rval = False
    
    timeF = 1000  #视频帧计数间隔频率
    
    while rval:   #循环读取视频帧
        rval, frame = vc.read()
        if(c%timeF == 0): #每隔timeF帧进行存储操作
            cv2.imwrite('image/'+str(c) + '.jpg',frame) #存储为图像
        c = c + 1
        cv2.waitKey(1)
    vc.release()


def main():
    img = "./1000.jpg"
    frame = cv2.imread(img) # origin image

    hm = density_heatmap(frame ,(4,4), radias=100)
    
    frame = cv2.imread(img) # origin image
    heatmap =use_heatmap(hm,(3,4)) # heatmap image
    overlay = frame.copy()
    alpha = 0.5 # 设置覆盖图片的透明度
    cv2.rectangle(overlay, (0, 0), (frame.shape[1], frame.shape[0]), (255, 0, 0), -1) # 设置蓝色为热度图基本色
    cv2.addWeighted(overlay, alpha, frame, 1-alpha, 0, frame) # 将背景热度图覆盖到原图
    cv2.addWeighted(heatmap, alpha, frame, 1-alpha, 0, frame) # 将热度图覆盖到原图
    cv2.imshow('frame', frame)
    cv2.waitKey(0)

main()
 