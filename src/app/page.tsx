'use client'

import { useState } from "react";
import { ProgressBar } from "./components/progress-bar";
import Tesseract from "tesseract.js";

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
      const worker = await Tesseract.createWorker("por", 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.floor(m.progress * 100));
          }
        }
      });

      const result = await worker.recognize(file);

      console.log(result.data.text);
      setText(result.data.text);
      setLoading(false);
    }
  };

  return (
    <main className="p-8 ">
      <div className="max-w-5xl flex flex-col gap-4">
        <input
          type="file"
          className="border border-gray-200 rounded p-4 w-fit"
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
