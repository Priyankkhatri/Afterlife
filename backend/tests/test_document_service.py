import asyncio
import os
import tempfile
import unittest

from app.services.document_service import _extract_text_from_file, serialize_document


class DocumentServiceTests(unittest.TestCase):
    def test_serialize_document_converts_id_and_preserves_fields(self) -> None:
        record = {
            "_id": "507f1f77bcf86cd799439011",
            "title": "Will",
            "category": "Property",
            "file_url": "https://example.com/will.pdf",
        }

        result = serialize_document(record)

        self.assertEqual(result["id"], "507f1f77bcf86cd799439011")
        self.assertEqual(result["title"], "Will")
        self.assertEqual(result["category"], "Property")
        self.assertEqual(result["file_url"], "https://example.com/will.pdf")

    def test_extract_text_from_plain_text_file(self) -> None:
        with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as handle:
            handle.write("Policy number 12345")
            temp_path = handle.name

        try:
            extracted = asyncio.run(_extract_text_from_file(temp_path))
            self.assertIn("Policy number", extracted)
        finally:
            os.remove(temp_path)


if __name__ == "__main__":
    unittest.main()
