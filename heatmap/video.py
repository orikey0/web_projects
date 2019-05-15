
import cv2
 
vc = cv2.VideoCapture(r'..//..//testVideo.mp4')  # 读入视频文件，命名vc
n = 1  # 计数
 
if vc.isOpened():  # 判断是否正常打开
    rval, frame = vc.read()
    print("正常打开")
else:
    rval = False
    print("异常打开")
 
timeF = 1000  # 视频帧计数间隔频率
 
i = 0
while rval:  # 循环读取视频帧
    rval, frame = vc.read()
    if (n % timeF == 0):  # 每隔timeF帧进行存储操作
        i += 1
        
        cv2.imwrite(r'./jg_filter/1/{}.jpg'.format(i), frame)  # 存储为图像
        print("存储成功")
        print(i)
    n = n + 1
    cv2.waitKey(1)
