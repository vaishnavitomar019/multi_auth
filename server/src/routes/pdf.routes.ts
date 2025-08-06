import express from 'express';
import multer from 'multer';
import { PdfController } from '../controllers/PdfController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const pdfController = new PdfController();

router.post('/summarize-pdf', upload.single('file'), pdfController.summarizePdf);

export default router;
