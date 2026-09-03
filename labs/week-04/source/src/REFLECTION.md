# Reflection - Pre-LAB04 / LAB04

## 1. State owner อยู่ที่ใดและเพราะอะไร
* **อยู่ที่ App Component (`tasks` และ `statusFilter`)**
* **เหตุผล:** เพราะเป็นข้อมูลที่ต้องใช้ร่วมกันในหลาย Child Components เช่น `SummaryPanel` ต้องคำนวณจำนวนงานทั้งหมด, `FilterBar` ใช้ปรับสถานะการกรอง และ `TaskList` ใช้แสดงรายการงาน การไว้ที่ Parent (`App`) ช่วยให้จัดการข้อมูลได้จากจุดเดียว (Single Source of Truth)

## 2. Props ไหลลงและ event ไหลกลับตรงไหน
* **Props ไหลลง (Data Down):**
  * `App` $\rightarrow$ ส่ง `tasks` ให้ `SummaryPanel`
  * `App` $\rightarrow$ ส่ง `filteredTasks` และ `onDeleteTask` ให้ `TaskList` $\rightarrow$ `TaskCard`
  * `App` $\rightarrow$ ส่ง `statusFilter` ให้ `FilterBar`
* **Event ไหลกลับ (Events Up):**
  * `TaskForm` $\rightarrow$ ส่งข้อมูลงานใหม่ผ่าน `onAddTask` กลับไปอัปเดตที่ `App`
  * `TaskCard` $\rightarrow$ ส่ง `id` ผ่าน `onDeleteTask` กลับไปลบงานที่ `App`
  * `FilterBar` $\rightarrow$ ส่งค่าสถานะผ่าน `onFilterChange` กลับไปอัปเดตที่ `App`

## 3. LAB 4 ต้องเปลี่ยน data contract และ validation อย่างไร
* **Data Contract:** เปลี่ยนจาก Study Task Board (`title`, `category`, `priority`, `status`) ไปเป็น Campus Service Request (`requesterName`, `requestType`, `location`, `details`, `priority`, `status`)
* **Validation:** 
  * `requesterName` $\ge$ 2 ตัวอักษร
  * `requestType` ต้องเลือก
  * `location` ห้ามว่าง
  * `details` $\ge$ 10 ตัวอักษร
  * `priority` ต้องเป็น `normal` หรือ `urgent`