// Node.js v18 LTS 이상에서는 파일이름.js 형식으로 import 해야함
import db from "../models/index.js";

// MVC 패턴

// DB에 CRUD 하는 작업 ==> 자바스크립트 함수(=메소드) ==> 라우터에서 사용할수 있게 ex.
// 작명 : 동사+명사(단수,복수)
// 비동기 통신 : callback function --> AJAX --> Promise --> async / await (최신)
// localhost:3000/add --> req.body 전달되는 각종 데이터(POST 통신)
const createUser = async (req, res) => {
    const { name, phone, email, relationship } = req.body; // 요청 바디에서 각 필드값을 추출(=구조분해할당 문법)
    try {
        // 이상이 없으면 DB에 데이터 삽입 .create({데이터}) 호출 ==> INSERT
        // console.log(name, phone, email, relationship);
        const result = await db.User.create({
            name,
            phone,
            email,
            relationship
        })

        res.json({
            status: 201,
            result
        });

    } catch (error) {
        console.log("에러메시지 : " + error);
    }
}

// removeUser, modifyUser, deleteUser + findAllUsers
// async function findAllUsers(req, res) {}
const findAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();

        res.json({
            status: 200,
            result: users
        })
    } catch (error) {
        console.log("에러메시지 : " + error);
    }
}

const findOneUser = async (req, res) => {
    // const { id } = req.params.id
    try {
        const foundUser = await db.User.findAll({
            where: {
                id: req.params.id
            }
        });

        if (!foundUser) {
            res.json({
                status: 500,
                message: "사용자 정보를 찾을 수 없습니다",
            })
        } else {
            res.json({
                status: 201,
                data: foundUser
            });
        }
    } catch (error) {
        console.log("에러메시지 : " + error);
    }
}

const updateUser = async (req, res) => {
    try {
        // 1. 대상 찾기 반환
        // 2. 대상의 특정 값, 컬럼을 새로운 값으로 치환하기
        // 3. 업데이트 요청
        const result = await db.User.update(
            { id: req.body.id },
            {
                where: {
                    id: req.body.id
                }
            })
            res.json({
                status: 201,
                message: "연락처가 업데이트 되었습니다.",
                data: result
            });
    } catch (error) {
        console.log("에러메시지 : " + error);
    }
}

const removeUser = async (req, res) => {
    try {
        const removeUser = await db.User.destroy({
            where: {
                id: req.body.id
            }
        });
        res.json({
            status: 201,
            message: "선택하신 연락처가 삭제되었습니다.",
            data: removeUser
        })
    } catch (error) {
        console.log("에러메시지 : " + error);
    }
}

const removeAllUsers = async (req, res) => {
    try {
        const removeAllUsers = await db.User.destroy({
            truncate: true
        })
        res.json({
            status: 201,
            message: "모든 연락처가 삭제되었습니다.",
            data: removeAllUsers
        })
    } catch (error) {
        console.log("에러메시지 : " + error);
    }
}

const userControl = {
    createUser,
    findAllUsers,
    findOneUser,
    updateUser,
    removeUser,
    removeAllUsers
}

// removeUser, modifyUser, deleteUser ...
export default userControl;