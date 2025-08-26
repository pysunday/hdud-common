import React, { useState, useRef, useEffect } from "react"
import cowsay_random from '../libs/cowsay';
import clsx from 'clsx';
import ru from 'react-use';
const { useWindowSize } = ru;

export default function({ value, className, maxHeight = 240, classNames = {} }) {
  const { width: windowWidth } = useWindowSize();
  const [h, setH] = useState(maxHeight);
  const [data, setData] = useState(value || cowsay_random());
  const [scale, setScale] = useState(1);
  const contentRef = useRef<HTMLPreElement>(null)
  const wrapRef = useRef<HTMLPreElement>(null)
  const updateWidth = () => {
    const contentWidth = contentRef.current.clientWidth;
    const contentHeight = contentRef.current.clientHeight;
    const wrapWidth = wrapRef.current.clientWidth;
    const wrapHeight = maxHeight;
    const newScale = Math.min(wrapWidth / contentWidth, wrapHeight / contentHeight);
    // console.log('更新', wrapWidth, contentWidth, wrapWidth / contentWidth, wrapHeight, contentHeight, wrapHeight / contentHeight);
    setScale(newScale);
    if (contentWidth > contentHeight) setH(contentHeight * newScale)
  };
  useEffect(() => {
    setScale(1);
    setH(maxHeight);
    const id = setTimeout(() => updateWidth());
    return () => clearTimeout(id);
  }, [data, windowWidth]);
  // console.log('文字图像', scale, h, wrapRef.current?.clientHeight ?? 0, contentRef.current?.clientHeight ?? 0)
  return (
    <div
      data-name={data.name}
      ref={wrapRef}
      className={clsx(
        "justify-center items-center h-full sm:min-w-[400px] self-center",
        className,
        classNames.base,
        scale > 1 ? classNames.up : classNames.down,
      )}
      style={{ height: `${h}px` }}
    >
      <pre
        ref={contentRef}
        className="transition-all duration-500 whitespace-pre h-min leading-tight font-mono text-sm hover:text-[turquoise] cursor-none select-none min-w-max"
        onClick={() => setData(cowsay_random())}
        style={{ scale: `${scale * 100}%`, fontWeight: scale > 1 ? 400 : 900 }}
      >
        {data.value}
      </pre>
    </div>
  )
}


