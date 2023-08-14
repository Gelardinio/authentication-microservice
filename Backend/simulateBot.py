import pyautogui
import time
import math

time.sleep(2)

target_positions = [(700, 500, 700), (200, 200, 500), (1200, 200, 400), (700, 550, 400)]
current_x, current_y = pyautogui.position()

for target_x, target_y, movement_speed in target_positions:
    distance = math.sqrt((target_x - current_x)**2 + (target_y - current_y)**2)
    move_duration = distance / movement_speed
    pyautogui.moveTo(target_x, target_y, duration=move_duration)
    current_x, current_y = target_x, target_y
    
pyautogui.click()
