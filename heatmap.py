import xlrd


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

