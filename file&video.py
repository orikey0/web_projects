import glob as gb
import cv2
import xlrd

#以下为视频分解部分
vc = cv2.VideoCapture(r"D:\down_file\tim\media2.mp4")
c=1
if vc.isOpened():
    rval,frame= vc.read()
else :
    rval = False

timeF = 1
i =0 
while rval:
    rval,frame= vc.read()
    if(c%timeF==0):

        cv2.imwrite('./image/'+str(i)+".jpg",frame)
        i+=1
    c = c+1
    cv2.waitKey(1)

vc.release()
#以上为视频分解部分

#以下为视频处理部分



# img_path = gb.glob("./image_heat/*.jpg") 
# videoWriter = cv2.VideoWriter('test.mp4', cv2.VideoWriter_fourcc(*'MJPG'), 25, (640,480))

# for path in img_path:
#     img  = cv2.imread(path) 
#     img = cv2.resize(img,(640,480))
#     videoWriter.write(img)
# def string_to_tuple(ss):
#     k = ''
#     kk = []
#     for i in ss:
#         if i =='(' :
#             continue
        
#         if i != ',' and i!=')':
#             k+=i
#         if i == ',' or i==')':
#             k = float(k)
#             kk.append(k)
#             k = ''
    
#     return tuple(kk)

