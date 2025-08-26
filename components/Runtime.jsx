// 运行时间面板
import React from "react"

export default function Runtime({ shows }) {
  const [runTime, setRunTime] = React.useState((new Date()) - (new Date('2017-03-28 07:41:09')));
  React.useEffect(() => {
    const intval = setInterval(() => setRunTime(runTime + 1000), 1000);
    return () => clearInterval(intval);
  });
  const data = {
    days: parseInt(runTime / (1000 * 60 * 60 * 24)),
    hours: parseInt((runTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: parseInt((runTime % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((runTime % (1000 * 60)) / 1000),
  }
  return (
    <div className="text-center py-8 sm:py-10 md:py-12 xl:py-16 bg-transparent">
	    <h1 className="text-cyan text-3xl sm:text-4xl md:text-5xl tracking-widest mb-8 sm:mb-10 md:mb-12 xl:mb-16 text-shadow-[0_0_10px_#00e6e6,0_0_20px_#00e6e6]">
	      {shows.title}
	    </h1>
	    <div className="flex justify-around">
	      {
	        ['days', 'hours', 'minutes', 'seconds'].map(key => {
	          return <div key={key} className="time-section mx-4 text-center">
			        <span className="text-2xl sm:text-3xl md:text-5xl text-cyan mb-1 block transition-transform duration-300 ease-in-out hover:scale-125 animate-neon-flicker text-shadow-[0_0_15px_#00ffff,0_0_30px_#00ffff] hover:text-shadow-[0_0_30px_#00ffff,0_0_60px_#00ffff]">
			          {data[key]}
			        </span>
			        <span className="text-cyan text-sm sm:text-md md:text-xl tracking-wide animate-neon-flicker">{key.toUpperCase()}</span>
		        </div>
	        })
	      }
	    </div>
    </div>
  )
}

