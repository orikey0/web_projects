import numpy
import cv2
import heatmap


def use_heatmap(image, box_centers):
    hm = heatmap.Heatmap()
    box_centers = [(i, image.shape[0] - j) for i, j in box_centers]
    img = hm.heatmap(box_centers, dotsize=200, size=(image.shape[1], image.shape[0]), opacity=128, area=((0, 0), (image.shape[1], image.shape[0])))
    return img


pts=[(1500,370),(1400,375)]
image = cv2.imread(r'./dog.jpg')
hm = heatmap.Heatmap()

img = hm.heatmap(pts, dotsize=400,size=(image.shape[1], image.shape[0]), opacity=128, area=((0, 0), (image.shape[1], image.shape[0]))).save("classic.png")

# how to save a project
frame = cv2.imread(r'./dog.jpg') # origin image
heatmap = cv2.imread('classic.png') # heatmap image
overlay = frame.copy()
alpha = 0.5 
cv2.rectangle(overlay, (0, 0), (frame.shape[1], frame.shape[0]), (255, 0, 0), -1) 
cv2.addWeighted(overlay, alpha, frame, 1-alpha, 0, frame) 
cv2.addWeighted(heatmap, alpha, frame, 1-alpha, 0, frame) 
cv2.imwrite('messigray.jpg', frame)

#cv2.imshow('frame', frame)
cv2.waitKey(0)