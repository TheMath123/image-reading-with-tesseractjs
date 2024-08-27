'use client'

import { useState } from "react";
import Tesseract from 'tesseract.js';
import { ProgressBar } from "./components/progress-bar";

export default function Home() {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setText('');
    setProgress(0);
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      const result = await Tesseract.recognize(file, 'por', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.floor(m.progress * 100));
          }
        },
      });
      setText(result.data.text);
      setLoading(false);
    }
  };

  return (
    <main className="p-8 ">


      <div className="max-w-2xl flex flex-col gap-4">
        <input
          type="file"
          name="image"
          id="input-image"
          className="border border-gray-200 rounded p-4"
          onChange={handleImageUpload}
        />

        {loading && <ProgressBar progress={progress} />}
        {text && (
          <div className="border border-gray-200 rounded p-4">
            <p className="whitespace-pre-wrap">{text}</p>
          </div>
        )}
      </div>
    </main>
  );
}
