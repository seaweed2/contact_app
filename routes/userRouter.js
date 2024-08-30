import express from "express";
const router = express.Router()
import userControl from '../controller/userController.js';

// 요청에 다른 응답 시간 (=성능측정 용도)
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// User(연락처) 생성
router.post('/user', userControl.createUser);

// User(연락처) 조회
router.get('/user/:id', userControl.findOneUser); // 동적파라미터
router.get('/users', userControl.findAllUsers);

// 연락처 삭제
router.delete('/users', userControl.removeAllUsers)
router.delete('/user/:id', userControl.removeUser)

// 연락처 수정 (put / patch)
router.patch('/user', userControl.updateUser);

//module.exports = router; // CommonJS 내보내기 문법 --> 현재는, ESM 방식
export default router;