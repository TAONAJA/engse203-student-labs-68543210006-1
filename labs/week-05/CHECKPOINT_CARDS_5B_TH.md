# LAB05 · Checkpoint Cards — คาบ 5B (Write Path)

เริ่มจากงานที่จบไว้ตอนคาบ 5A · **ทำ TODO ที่ขึ้นต้นด้วย `5B-` เท่านั้น**

| CP | เวลา | โหมด | สิ่งที่ต้องทำ | ผ่านเมื่อ |
|---|---:|---|---|---|
| **CP04a** | 55 | ทำเอง | `5B-B` writeStoredRequests · `5B-4/5/6` add, delete, reset · `5B-CP04a` หน้าสร้างคำร้อง | เพิ่มแล้วเด้งไปหน้ารายละเอียด · ลบแล้ว refresh ไม่กลับมา |
| **CP04b** | 55 | ทำด้วยกัน → ทำเอง | `5B-A` readStoredRequests · `5B-2` loadNormalRequests · `5B-3` เปลี่ยน 1 บรรทัด | refresh คงข้อมูล · ข้อมูลเสียหายกู้คืนได้ไม่ crash |
| **cleanup** | 30 | ดูสาธิต → ทำเอง | เพิ่ม cleanup guard ใน 2 หน้า | สลับหน้าเร็ว ๆ ระหว่างโหลดแล้วไม่เกิดข้อมูลผิด |
| **CP05b** | 30 | ทำเอง | ตรวจ regression Week 04 ครบ 11 ข้อ | ของเดิมทำงานครบทุกข้อ |
| **CP06** | 40 | ทำเอง | 375px · คีย์บอร์ด · build · หลักฐาน · ส่งมอบ | `npm run check` ผ่าน 133/133 |

## CP04b-3 — ช่วงเวลาสำคัญที่สุดของทั้งสองคาบ

ก่อนแก้ ให้ตอบก่อนว่า **`DashboardPage.jsx` ต้องแก้กี่บรรทัด**

จดคำตอบไว้ แล้วค่อยเปิดดูว่าจริง ๆ ต้องแก้เท่าไร

```js
// ใน requestService.js
- return fetchSeedRequests();
+ return loadNormalRequests(options.onRecovery);
```

## คำถามที่ต้องตอบได้ก่อนผ่านแต่ละ CP

| CP | คำถาม |
|---|---|
| CP04a | ทำไม Service ต้องบันทึกให้เสร็จก่อนที่หน้าจอจะบอกว่าสำเร็จ |
| CP04b | เปลี่ยนจาก seed เป็น storage แล้วทำไมหน้า Dashboard ไม่ต้องแก้ |
| cleanup | ทำไม React ถึงเรียก Effect สองรอบตอนพัฒนา |
| CP05b | regression คืออะไร และทำไมต้องทดสอบซ้ำทั้งที่เคยผ่านแล้ว |
| CP06 | ทำไม checker ผ่าน 133/133 ไม่ได้แปลว่างานเสร็จ |

## จบคาบนี้ต้องได้

```
npm run check                    →  ผ่าน 133/133 รายการ
npm run build                    →  ผ่าน
```

พร้อมส่ง — `evidence/TEST_REPORT.md` ครบ 24 รายการ · ภาพหน้าจอ 10 ภาพ · Pages · PR · tag `lab-05-submission-v1`
