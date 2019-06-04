# python2 热度图部分代码
import cv2
import matplotlib.pyplot as plt
import numpy as np
from scipy.spatial import distance
import xlrd

#数据导入
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

#创建热度图
def use_heatmap(image, box_centers):
    import heatmap
    hm = heatmap.Heatmap()
    box_centers = [(i, image.shape[0] - j) for i, j in box_centers]
    img = hm.heatmap(box_centers, dotsize=200, size=(image.shape[1], image.shape[0]), opacity=128, area=((0, 0), (image.shape[1], image.shape[0])))
    return img   

for i in range(921):


    img= r'./'+str(i)+'.jpg'
    frame = cv2.imread(img) # origin image
    box_centers=sheet[i]
    heatmap=use_heatmap(frame,box_centers)

    overlay = frame.copy()
    alpha = 0.5 
    cv2.rectangle(overlay, (0, 0), (frame.shape[1], frame.shape[0]), (255, 0, 0), -1) 
    cv2.addWeighted(overlay, alpha, frame, 1-alpha, 0, frame) 
    cv2.addWeighted(heatmap, alpha, frame, 1-alpha, 0, frame) 
    cv2.imshow('frame', frame)
    cv2.waitKey(0)