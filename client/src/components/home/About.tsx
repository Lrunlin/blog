import { useState, useEffect, useRef, MouseEvent, FunctionComponent } from "react";
import BarHeader from "@/components/home/BarHeader";
import WaveImage from '../../../public/image/wave.png';

interface aboutItemPropsTypes {
  text: string;
  image: string;
  saturation: number;
}

const AboutItem: FunctionComponent<aboutItemPropsTypes> = props => {
  const [state, setState] = useState<number>(0);
  let timer = useRef<NodeJS.Timer | null>(null);

  function add(e: MouseEvent<HTMLElement>): void {
    e.stopPropagation();
    timer.current && clearInterval(timer.current); //每次先清除定时器
    setState(0); //每次先设置成0，防止重复触碰继续上次的值显示
    timer.current = setInterval(() => {
      setState(s => ++s);
    }, 10);
  }
  function less(e: MouseEvent<HTMLElement>): void {
    e.stopPropagation();
    setState(0);
    timer.current && clearInterval(timer.current);
  }
  useEffect(() => {
    if (timer.current && state == props.saturation) {
      clearInterval(timer.current);
    }
  }, [state]);
  useEffect(() => {
    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, []);
  let color = "red";
  return (
    <div style={{ textAlign: "center" }}>
      <style jsx>{`
        .about-item_container {
          border: 1px dotted black;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .about-item_main {
          width: 40px;
          height: 40px;
          background: #666666;
          color: white;
          color: ${color};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .about-item_saturation {
          position: absolute;
          color: white;
          color: color;
          z-index: 99;
          display: none;
          transform: scale(0);
          font-size: 18px;
          font-weight: 700;
        }
        .about-item_wave_container {
          position: absolute;
          border-radius: 50%;
          overflow: hidden;
          width: 100px;
          height: 100px;
        }
        .about-item_wave {
          width: 200px;
          height: 135px;
          transition: 0.4s;
          opacity: 0.4;
          transform: translateY(100px);
        }
        /*水波纹横向动画*/
        @keyframes wave-animate {
          to {
            margin-left: -100px;
          }
        }
        .about-item_container:hover {
          .about-item_logo {
            transition: 0.4s;
            transform: scale(0);
            display: none;
          }
          .about-item_saturation {
            transition: 0.4s;
            display: block;
            transform: scale(1);
          }
          .about-item_wave {
            transition: 0.6s;
            transform: translateY(${100 - props.saturation}px);
            animation: wave-animate 1s linear; /*匀速重复执行*/
            animation-iteration-count: infinite;
          }
        }
      `}</style>
      <div className="about-item_container" onMouseEnter={e => add(e)} onMouseLeave={e => less(e)}>
        <div className="about-item_main">
          <img
            className="about-item_logo"
            width={25}
            height={25}
            src={`/image/${props.image}`}
            alt={props.text}
          />
          <span className="about-item_saturation">{`${state}%`}</span>
        </div>
        <div className="about-item_wave_container">
          {/* <img src="/image/wave.png" className="about-item_wave" /> */}
          <img src={WaveImage.src} className="about-item_wave" />
        </div>
      </div>
      <p>{props.text}</p>
    </div>
  );
};

const About: FunctionComponent = () => {
  let aboutItemList: aboutItemPropsTypes[] = [
    {
      text: "HTML/CSS",
      image: "HTML5.png",
      saturation: 80,
    },
    {
      text: "JavaScript",
      image: "javascript.png",
      saturation: 60,
    },
    {
      text: "Vue",
      image: "vue.png",
      saturation: 70,
    },
    {
      text: "Node",
      image: "node.png",
      saturation: 50,
    },
    {
      text: "React",
      image: "react.png",
      saturation: 55,
    },
    {
      text: "TypeScript",
      image: "typescript.png",
      saturation: 25,
    },
  ];

  return (
    <>
      <style jsx>{`
        .about-item {
          display: flex;
          justify-content: space-around;
          max-width: 1000px;
          margin: 20px auto;
        }
      `}</style>
      <BarHeader id="about" titleEn="ABOUT ME" title="关于·我" />
      <div className="about-item">
        {aboutItemList.map(item => (
          <AboutItem {...item} key={`aboutItem${item.text}`} />
        ))}
      </div>
    </>
  );
};
export default About;
