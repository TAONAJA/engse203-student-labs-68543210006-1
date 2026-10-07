# API_TEST — LAB 07

**ชื่อ–รหัส:** นาย นนทชัย ไทยตัน 68543210012-9 **วันที่ทดสอบ:** 23 กันยายน 2569

> บันทึก **ผลจริง** ที่เห็น ไม่ใช่ผลที่ควรได้ · ถ้าไม่ผ่านให้เขียนว่าไม่ผ่าน

## 1. ผลการทดสอบ API ด้วย Automated Test (`npm test`)

| # | สิ่งที่ทดสอบ | Method | Path | status ที่ควรได้ | status ที่ได้จริง | ผ่าน |
|---|---|---|---|---|---|---|
| 1 | คืนรายการทั้งหมดและเช็คว่าเป็น array | GET | `/api/requests` | 200 | 200 OK | ✅ |
| 2 | กรณีพบข้อมูลคำร้อง | GET | `/api/requests/REQ-001` | 200 | 200 OK | ✅ |
| 3 | กรณีไม่พบข้อมูลคำร้อง | GET | `/api/requests/REQ-999` | 404 | 404 Not Found | ✅ |
| 4 | ข้อมูลถูกต้อง และ status ตั้งเป็น pending | POST | `/api/requests` | 201 | 201 Created | ✅ |
| 5 | ข้อมูลไม่ครบ (เช่น requesterName ว่าง) | POST | `/api/requests` | 400 | 400 Bad Request | ✅ |
| 6 | CORS header ตอบ origin ที่อนุญาต | GET | `/api/requests` | อนุญาต `localhost:5173` | ตอบกลับ `localhost:5173` | ✅

## 2. Terminal Log ผลการรัน `npm test` (CP16)

```text
> engse203-week06-campus-api@2.0.0 test
> node --test "tests/*.test.js" GET /api/requests

GET /api/requests 200 2.324 ms - 1030
▶ GET /api/requests
  ✔ คืนรายการทั้งหมด พร้อม status 200 (20.829428ms)
GET /api/requests/REQ-001 200 0.561 ms - 321
  ✔ GET /api/requests/:id พบ → 200 (3.82946ms)
GET /api/requests/9999 404 0.288 ms - 62
  ✔ GET /api/requests/:id ไม่พบ → 404 (3.012347ms)
POST /api/requests 201 5.856 ms - 258
  ✔ POST ข้อมูลถูกต้อง → 201 และ status เป็น pending (9.861555ms)
POST /api/requests 400 0.770 ms - 406
  ✔ POST ข้อมูลไม่ครบ → 400 (6.837708ms)
GET /api/requests 200 0.282 ms - 1289
  ✔ CORS header ตอบ origin ที่อนุญาต (2.840745ms)
✔ GET /api/requests (52.362625ms)
ℹ tests 6
ℹ suites 1
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 241.977411
```

## Screenshot ที่แนบ

- [x] [images/network-cors-ok.png](../evidence/images/network-cors-ok.png)
- [x] [images/app-with-api.png](../evidence/images/app-with-api.png)
- [x] [images/error-state.png](../evidence/images/error-state.png)