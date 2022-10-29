const router = require('express').Router();
const userController = require('../Controller/userController');
const auth = require('../middleWare/userAuth');

/**
 * @swagger
* /api/signup:
*   post:
*     tags:
*       - User
*     description: Creating Docs for USER
*     produces:
*       - application/json
*     parameters:
*       - name: firstName
*         description: first Name required.
*         in: formData
*         required: true
*       - name: lastName
*         description: last Name required.
*         in: formData
*         required: true
*       - name: city
*         description: city required.
*         in: formData
*         required: true
*       - name: mobileNumber
*         description: Mobile Number required.
*         in: formData
*         required: true
*       - name: email
*         description: email required.
*         in: formData
*         required: true
*       - name: password
*         description: password required.
*         in: formData
*         required: true
*       - name: confirmPassword
*         description: confirmPassword required.
*         in: formData
*         required: true
*     responses:
*       200:
*         description: Thanks, You have successfully signup.
*       500:
*         description: Internal Server Error
*       501:
*         description: Something went wrong!
*/
router.post ('/signup',userController.signup);


/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - User
 *     description: login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: Password required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully Login.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
 router.post("/login",userController.login)

 /**
 * @swagger
 * /api/changePassword:
 *   put:
 *     tags:
 *       - User
 *     description: Change Password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: Token required.
 *         in: header
 *         required: true
 *       - name: newPassword
 *         description: New Password required.
 *         in: formData
 *         required: true
 *       - name: confirmPassword
 *         description: confirmPassword required.
 *         in: formData
 *         required: true
 *       - name: oldPassword
 *         description: Old Password required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Password Change Successfully.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.put("/changePassword",auth.verifyToken,userController.changePassword)

module.exports = router;