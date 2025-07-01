const express = require('express');
const multer = require('multer');
const supabase = require('../utils/supabase');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/logo', upload.single('image'), async (req, res) => {
  const file = req.file;
  const fileName = `${Date.now()}-${file.originalname}`;
  const filePath = `logos/${fileName}`; // This will be your object key

  try {
    const { data, error } = await supabase.storage
      .from('projects')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype
      });

    if (error) throw error;

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('projects')
      .getPublicUrl(filePath);

    res.status(200).json({ url: urlData.publicUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

module.exports = router;
