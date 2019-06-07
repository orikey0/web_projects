
import cv2
import matplotlib.pyplot as plt
import numpy as np
from scipy.spatial import distance
import xlrd
import numpy


wb = xlrd.open_workbook('./file_2.xlsx')
sh = wb.sheet_by_index(0)
sheet = []
n = sh.nrows
def string_to_tuple(ss):
    k = ''
    kk = []
    for i in ss:
        if i =='(' :
            continue
        
        if i != ',' and i!=')':
            k+=i
        if i == ',' or i==')':
            k = float(k)
            kk.append(k)
            k = ''
    
    return tuple(kk)
    
for i in range(n):
    k = []
    num_1 = int(sh.cell(i,1).value)
    if num_1 == 0:
        sheet.append(k)
        continue
    else :
        for j in range(2,num_1+2):
            k.append(string_to_tuple(sh.cell(i,j).value))
        sheet.append(k)


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
    cmap = plt.get_cmap("rainbow") 
    blue = Color("blue")
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

for i in range(921):


    img= r'./image/'+str(i)+'.jpg'
    frame = cv2.imread(img) # origin image
    box_centers=sheet[i]
    if box_centers!=[]:
        hm = density_heatmap(frame ,[(400,400)], radias=100)    
    
    frame = cv2.imread(img)

    heatmap=use_heatmap(frame,box_centers)
    img = cv2.cvtColor(numpy.asarray(heatmap),cv2.COLOR_RGB2BGR)

    overlay = frame.copy()
    alpha = 0.5 
    
    cv2.rectangle(overlay, (0, 0), (frame.shape[1], frame.shape[0]), (255, 0, 0), -1) 
    cv2.addWeighted(overlay, alpha, frame, 1-alpha, 0, frame) 
    cv2.addWeighted(img, alpha, frame, 1-alpha, 0, frame)
    cv2.imwrite('./heat_image/'+str(i)+'.jpg',frame)
    cv2.waitKey(0)
# img = "./1000.jpg"
# frame = cv2.imread(img) # origin image

# hm = density_heatmap(frame ,[(400,400)], radias=100)

# frame = cv2.imread(img) # origin image
# heatmap =use_heatmap(hm,[(300,400)]) # heatmap image
# img = cv2.cvtColor(numpy.asarray(heatmap),cv2.COLOR_RGB2BGR)
# overlay = frame.copy()
# alpha = 0.5
# cv2.rectangle(overlay, (0, 0), (frame.shape[1], frame.shape[0]), (255, 0, 0), -1) 
# cv2.addWeighted(overlay, alpha, frame, 1-alpha, 0, frame) 
# cv2.addWeighted(img, alpha, frame, 1-alpha, 0, frame) 
# cv2.imwrite('classic.jpg',frame)
# cv2.waitKey(0)
