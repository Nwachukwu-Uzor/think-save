"use client";
import React, { useEffect, useState, FC, ReactNode, ReactElement } from "react";
import { useSwipeable } from "react-swipeable";

interface CarouselItemProps {
  children: ReactNode;
}

export const CarouselItem: FC<CarouselItemProps> = ({ children }) => {
  return <div className="carousel-item h-full w-full">{children}</div>;
};

interface CarouselProps {
  children: ReactElement[];
  speed: number;
}

export const Carousel: FC<CarouselProps> = ({ children, speed }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, speed);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({});

  return (
    <div
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, _index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        {React.Children.map(children, (_child, index) => {
          return (
            <>
              <span
                className={`h-[6px] w-[6px] lg:h-[10px] lg:w-[10px] rounded-full cursor-pointer border border-white ${
                  index === activeIndex ? "bg-white" : "bg-[#FF7C7E]"
                } duration-150`}
                onClick={() => {
                  updateIndex(index);
                }}
              ></span>
            </>
          );
        })}
      </div>
    </div>
  );
};
