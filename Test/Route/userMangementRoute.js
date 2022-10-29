const router = require('express').Router();
const userMangementController = require('../Controller/userMangement');
/**
 * @swagger 
 * /api/userMangementRouter/list:
 *   get:
 *     tags:
 *       - UserMangement
 *     description: list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: city
 *         description: city required.
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, Show list succesfull.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
 router.post('/userMangementRouter/list',userMangementController.list)
 /**
 * @swagger 
 * /api/userMangementRouter/block:
 *   put:
 *     tags:
 *       - UserMangement
 *     description: block
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: _id required.
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, Show list succesfull.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
 router.put('/userMangementRouter/block',userMangementController.Block)

 module.exports = router;