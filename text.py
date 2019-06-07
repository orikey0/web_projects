# import cv2
# img = cv2.imread('./heat_image/0.jpg')
# imgInfo = img.shape
# size = (imgInfo[1],imgInfo[0])
# print(size)
# videoWrite = cv2.VideoWriter('./22.mp4',-1,15,size)# 写入对象 1 file name
# # 2 编码器 3 帧率 4 size
# for i in range(921):
#     fileName = './heat_image'+str(i)+'.jpg'
#     img = cv2.imread(fileName)
#     videoWrite.write(img)# 写入方法 1 jpg data
# print('end!')
# import cv2
# img = cv2.imread('./heat_image/0.jpg')
# imgInfo = img.shape
# size = (imgInfo[1],imgInfo[0])
# fps = 1  

# videowriter = cv2.VideoWriter("a.avi",cv2.VideoWriter_fourcc('M','J','P','G'),fps,size)
 
# for i in range(1,200):
#     fileName = './heat_image'+str(i)+'.jpg'
#     img = cv2.imread(fileName)
#     videowriter.write(img)

import cv2
import os
import numpy
import numpy as np
import glob

def imgs2video(imgs_dir, save_name):
    fps = 25
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    video_writer = cv2.VideoWriter(save_name, fourcc, fps, (1920, 1080))
    # no glob, need number-index increasing
    imgs = glob.glob(os.path.join(imgs_dir, '*.jpg'))

    for i in range(len(imgs)):
        imgname = os.path.join(imgs_dir, str(i)+'.jpg')
        frame = cv2.imread(imgname)
        video_writer.write(frame)

    video_writer.release()
imgs_dir = r'F:\python\myweb\heat_image'
save_name = r'./output.avi'   
imgs2video(imgs_dir,save_name)