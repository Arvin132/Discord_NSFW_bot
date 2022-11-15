import tkinter as tk
from detect import getImage, is_nsfw
from tkinter import messagebox
from PIL import ImageTk

    

root = tk.Tk()
img = getImage("")
img2 = ImageTk.PhotoImage(img.resize((500, int(500 * img.height / img.width))))
tk.Label(root, image= img2).pack()

tk.Button(text= "Save", command= lambda : img.save("image.jpg")).pack()
tk.Button(text= "Predict", command= lambda : messagebox.showinfo(title="some Title", message=str(is_nsfw("./image.jpg")))).pack()

root.mainloop()