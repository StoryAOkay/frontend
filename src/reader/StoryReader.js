import React, { useState } from "react";
import {
  useSprings,
  animated,
  to
} from "react-spring";
import { useGesture } from "@use-gesture/react";
import { calculate } from "../Helpers/Calculate";
import '../App.css'
import '../index.css'

import { disablePageScroll, enablePageScroll } from "scroll-lock";

const pages = ["#662e9b", "white", "white", "white", "white", "white", "white", 'white', 'white', "#662e9b"];

const html = {
  0: `<div class=\"title\"><h1>Tintin and the forty thieves</h1><img src='https://upload.wikimedia.org/wikipedia/en/e/e2/Tintin_and_Snowy.png'/> </div>`,
  1: `
  <p class="number">1</p>
   <p> <img src='https://scontent.fdet2-1.fna.fbcdn.net/v/t39.30808-6/439900240_314543045068164_4794661572072688720_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=UjCHS0TtMcIQ7kNvgHDD518&_nc_ht=scontent.fdet2-1.fna&oh=00_AfDHB3CoF1hJYoZ-nM25IdixT3gzAiPMzSRv2zG7XX0jAw&oe=662DEA67'/><p>
  <p class='tpadding'>Tintin and Captain Haddock were on a scorching adventure in Morocco. The relentless sun beat down on their backs as they trekked through the bustling marketplace of Marrakesh. </p>

  `,
  2: `
  <p class="number right">2</p>
  <p class='tpadding tbold'> Snowy, Tintin's loyal fox terrier, darted between their legs, panting excitedly. A chance encounter with a frantic scholar sent them on a thrilling quest – to uncover the hidden treasure of the Forty Thieves!</p>
  <p class='tpadding'>The scholar, a weathered Professor ben Thura, spoke of a cryptic parchment passed down through his family. It alluded to a forgotten tomb deep within the unforgiving Sahara Desert. </p>
  <p class='tpadding'>Legend spoke of forty ruthless bandits who stashed their loot in a secret chamber, protected by a cunning riddle. Tintin, ever the adventurer, was instantly captivated. Captain Haddock, however, was less enthusiastic about the prospect of braving the desert heat, especially in search of mere whispers of treasure. </p>
 <p class='tpadding'>Following Professor ben Thura's clues, they ventured out into the vast desert landscape. The scorching sun turned the sand into a shimmering sea of gold.</p>
  `,
  3: `<p class="number">3</p>
  <p  class='tpadding'>Days bled into one another. Just as Captain Haddock was about to throw in the towel, Tintin spotted a weathered landmark – a crumbling archway half-buried in the sand.</p> 
  <p> <img src=' https://scontent.fdet2-1.fna.fbcdn.net/v/t39.30808-6/439521392_314583541730781_8344310693053377823_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=52YkSWQU7O8Ab5znVa7&_nc_oc=Adi01sGbWr9O_4frGUWoigz8Ze1OtinGc33c1KHkSJAZeWrdKCwfd0306F7JH-j7SF4&_nc_ht=scontent.fdet2-1.fna&oh=00_AfACufe2w_34H0d1JaaCgONMaEkO7aawdIIPfjOPjzaf_g&oe=662DF9F5'/><p>


  `,
  4: `
   
    <p class="number right">4</p>
    <p class='tpadding'> It matched the cryptic sketch on the parchment! Beneath the archway, a hidden passage plunged into the cool darkness. With renewed enthusiasm, they squeezed through the narrow entrance. </p> 
    <p class='tpadding'>The passage led them into a labyrinthine network of tunnels, each twist and turn shrouded in mystery. The air grew thick with dust and the silence was broken only by the echo of their footsteps. After what felt like an eternity, they stumbled into a vast cavern.</p><pclass='tpadding'> In the center stood an imposing stone sarcophagus, gleaming faintly in the torchlight. Engravings on the sarcophagus surface depicted the forty thieves, their faces twisted in menacing grimaces. Below the image, an inscription in a forgotten language taunted them – "Solve my riddle, or forever be lost."</p>
  `,
  5: `
  <p class="number">5</p>
  <p class='tpadding'> Professor ben Thura, his eyes gleaming with excitement, deciphered the riddle. It spoke of a doorway that blended with the shadows, activated only by a specific phrase.<p><p class='tpadding'> After much deliberation, Tintin uttered the secret words. A section of the wall shimmered and dissolved, revealing a hidden chamber stacked high with treasure – chests overflowing with gold, jewels, and artifacts that glittered in the flickering torchlight. </p> 
  <p class='tpadding'>TJust as they marveled at their discovery, the ground trembled beneath their feet. A hidden passage emerged from the shadows, disgorging a band of furious figures. They were the descendants of the Forty Thieves, their greed evident in their eyes</p><pclass='tpadding'>A thrilling chase ensued through the caverns. Tintin, Haddock, and the Professor narrowly dodged swinging scimitars and desperate leaps. </p>`,
  6: `
  <p class="number right">6</p>
  <p class='tpadding'>Snowy, surprisingly spry despite the journey, nipped at the heels of the pursuing thieves, causing much chaos.</p>
  <p> <img src='https://scontent.fdet2-1.fna.fbcdn.net/v/t39.30808-6/439417278_314594825062986_2582062655773728897_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=uyQdVhod0lkAb6Nu1Si&_nc_ht=scontent.fdet2-1.fna&oh=00_AfCevNaWOJHyvVF81-wZeMmPjAJFzZHFRJ5j26jHOICd-A&oe=662DE6E6'/><p>
  
  `,

  7:
  `<p class="number">7</p>
  <p class='tpadding'> In the end, Tintin's quick wit and Captain Haddock's booming voice proved too much for the bumbling thieves. They were apprehended, their dreams of riches shattered. The treasure was handed over to the authorities, a small token kept as a reminder of their daring adventure.</p> 
  <p class='tpadding'>Exhausted but exhilarated, Tintin, Haddock, Snowy, and Professor ben Thura emerged from the desert sands. The setting sun cast long shadows, painting the dunes in hues of orange and purple. They had not only unearthed a legendary treasure but also forged a remarkable friendship along the way.</p><div style="margin: 60px auto; text-align:center; font-weight:700; color: #662e9b;"><p>The END!!!</p></div>`,
  
  8:``,
  9:`<center style="margin: 120px auto; color: #fff;">&copy; 2024 StoryNasi</center>`,
};
const bookHeight = parseFloat(window.innerHeight) - 240;
const bookWidth = 796;

// const bookHeight = 439;
// const bookWidth = 658;

let pageWidth = bookWidth / 2;
const from = i => ({
  x: pageWidth,
  y: 0,
  x1: 0,
  y1: 0,
  x2: pageWidth,
  y2: 0,
  x3: pageWidth,
  y3: bookHeight,
  x4: 0,
  y4: bookHeight,
  x5: 0,
  y5: bookHeight,
  z: i === 0 ? 2 : i >= 2 ? 0 : 1,
  display: i <= 2 ? "block" : "none",
  bgPos: 0,
  bgPosY: 0,
  bgRad: 0,
  bgHeight: bookHeight,
  bgDisplay: "none",
  bgY2: 0,
  r: 0,
  scaleX: 1,
  index: 0
});

const nto = from;
const StoryReader = () => {
  React.useEffect(() => {
    disablePageScroll();
    return () => {
      enablePageScroll();
    };
  }, []);

  const [previousWasFinished, setPreviousWasFinished] = useState(true);
  const [springs, api] = useSprings(pages.length, i => ({
    ...nto(i),
    from: from(i)
  }));
  const onHoverHandler = ({ hovering, down }) => {
    return false;
  };
  const onDragHandler = ({
    args: [index],
    down,
    delta: [xDelta],
    distance,
    direction: [xDir],
    movement,
    velocity,
    event,
    initial,
    cancel,
    canceled,
    active,
    first,
    last,
    xy,
    memo
  }) => {
    //if (!previousWasFinished) return;

    if (distance === 0) return;
    const dir = xDir < 0 ? -1 : 1;

    let bgPos = 0;
    let bgRad = 0;
    let bgDisplay = "none";
    let bgPosY = 0;
    let bgY2 = 0;
    let bgHeight = bookHeight;
    const customConfig = {
      friction: 0,
      tension: down ? 0 : 100, 
      clamp: true,
      precision: 0,
    };
   
    const nto = {
      x: pageWidth,
      y: 0,
      x1: 0,
      y1: 0,
      x2: pageWidth,
      y2: 0,
      x3: pageWidth,
      y3: bookHeight,
      x4: 0,
      y4: bookHeight,
      x5: 0,
      y5: bookHeight,
      z: 1,
      bgPos: 0,
      bgPosY: 0,
      bgRad: 0,
      bgY2: 0,
      bgHeight: bookHeight,
      bgDisplay: "none",
      display: "none",
      config: customConfig,
      onRest: null,
      immediate: false,
      r: 0,
      scaleX: 1,
      index
    };
    //if (!previousWasFinished && down) return;
    let side;
    let offsetLeft = document.getElementById("book-container").offsetLeft;
    if (initial[0] - offsetLeft <= pageWidth) side = "left";
    else if (initial[0] - offsetLeft > pageWidth) side = "right";
    else if (dir === -1) side = "right";
    else side = "left";

    const needFinishTurn =
      !down &&
      ((movement[0] > 100 && side === "left") ||
        (movement[0] < -100 && side === "right"));

    // FOR TEST
    //setPreviousWasFinished(true);
    //if (!down) return;

    setPreviousWasFinished(false);

    const onFinishTurnFromRight = () => {
      api.start(i => {
        if (i === index)
          return {
            ...nto,
            z: 2,
            display: "none",
            x: 0,
            immediate: true
          };
        if (i === index + 1)
          return {
            ...nto,
            z: 1,
            x: 0,
            display: "block",
            immediate: true
          };
        if (i === index + 2)
          return {
            ...nto,
            z: 1,
            display: "block",
            immediate: true
          };
        if (i === index - 1)
          return {
            ...nto,
            x: 0,
            z: 0,
            display: "block",
            immediate: true
          };

          if(i === index+4) {
            return {
              ...nto,
              x: pageWidth,
              z: 0,
              display: "block",
              immediate: true
            };
          }
        return { ...nto, z: 0, display: "none", immediate: true };
      });

      setPreviousWasFinished(true);
    };

    const onFinishTurnFromLeft = () => {
      api.start(i => {
        if (i === index)
          return {
            ...nto,
            z: 2,
            x: pageWidth,
            immediate: true,
            display: "none"
          };
        if (i === index - 1)
          return {
            ...nto,
            z: 1,
            x: pageWidth,
            display: "block",
            immediate: true
          };
        if (i === index - 2)
          return {
            ...nto,
            x: 0,
            z: 1,
            display: "block",
            immediate: true
          };
          if(i === index+1) {
            return {
              ...nto,
              x: pageWidth,
              z: 0,
              display: "block",
              immediate: true
            };
                   }
        return { ...nto, z: 0, display: "none", immediate: true };
      });
      setPreviousWasFinished(true);
    };

    const onRestFnLeft = () => {
      if (!down && needFinishTurn) onFinishTurnFromLeft();
      else if (!needFinishTurn && !down) setPreviousWasFinished(true);
    };

    const onRestFnRight = x => {
      if (!down && needFinishTurn) {
        onFinishTurnFromRight();
      }
      else if (!down && !needFinishTurn) {
        setPreviousWasFinished(true);
      }
    };

    let rotationParams = calculate(
      side,
      xy[0],
      xy[1],
      initial,
      down,
      needFinishTurn,
      movement
    );

    let memoRotationParams = rotationParams;

    api.start(i => {
      let x1 = 0;
      let y1 = 0;
      let x2 = 0;
      let y2 = 0;
      let x3 = 0;
      let y3 = 0;
      let x4 = 0;
      let y4 = 0;
      let x5 = 0;
      let y5 = 0;

      if (side === "left") {
        if (i === index - 1) {
          rotationParams.x5 = rotationParams.x4;
          rotationParams.y5 = rotationParams.y4;

          let result2 = {
            ...nto,
            display: "block",
            z: 2,
            ...rotationParams,
            bgPos: rotationParams.x1,
            scaleX: 1,
            onRest: () => {
              onRestFnLeft(rotationParams.x);
            }
          };

          if (!down && needFinishTurn) {
            let dist = memo.z0x;
            if (rotationParams.z0 === 1) dist = memo.z1x;

            if (rotationParams.z1 === 1 || rotationParams.z0 === 1) {
              return {
                r: 0,
                x: -pageWidth + dist * 2,
                y: 0,
                x1: pageWidth - dist,
                y1: 0,
                x2: pageWidth,
                y2: 0,
                x3: pageWidth,
                y3: bookHeight,
                x4: pageWidth - dist,
                y4: bookHeight,
                x5: pageWidth - dist,
                y5: bookHeight,
                immediate: true,
                onRest: () => {
                  api.start(i => {
                    if (i === index) {
                      dist = pageWidth; // hack
                      return {
                        x1: dist,
                        y1: 0,
                        x2: pageWidth,
                        y2: 0,
                        x3: pageWidth,
                        y3: bookHeight,
                        x4: dist,
                        y4: bookHeight,
                        x5: dist,
                        y5: bookHeight,
                        immediate: true,
                        onRest: () => {
                          api.start(i => {
                            if (i === index) {
                              return {
                                x: bookWidth,
                                display: "none",
                                immediate: false,
                                config: customConfig,
                                x1: pageWidth,
                                x2: pageWidth,
                                x3: pageWidth,
                                x4: pageWidth,
                                x5: pageWidth
                              };
                            }
                            if (i === index - 1) {
                              let r = result2;
                              r.onRest = () => onFinishTurnFromLeft();
                              return r;
                            }
                          });
                        }
                      };
                    } else return;
                  });
                }
              };
            } else return result2;
          } else return result2;
        } else if (index === i) {
          if (rotationParams.z1 === 1) {
            // top corner
            x1 = rotationParams.z0x;
            x2 = pageWidth;
            x3 = pageWidth;
            y3 = bookHeight;
            y4 = bookHeight;
            x5 = rotationParams.z1x;
            y5 = rotationParams.z1y;

            if (!down && !needFinishTurn) {
              x1 = 0;
              x5 = 0;
              y5 = 0;
            }
          } else if (rotationParams.z0 === 1) {
            // bottom corner
            x2 = pageWidth;
            x3 = pageWidth;
            y3 = bookHeight;
            x4 = rotationParams.z1x;
            y4 = bookHeight;
            x5 = 0;
            y5 = rotationParams.z0y;
          } else {
            // normal
            x1 = rotationParams.z0x;
            x2 = pageWidth;
            x3 = pageWidth;
            y3 = bookHeight;
            x4 = rotationParams.z1x;
            y4 = bookHeight;
            x5 = rotationParams.z1x;
            y5 = bookHeight;
          }

          let result = {
            ...nto,
            display: "block",
            x: 0,
            x1,
            y1,
            x2,
            y2,
            x3,
            y3,
            x4,
            y4,
            x5,
            y5
          };

          if (
            !down &&
            needFinishTurn &&
            (rotationParams.z1 === 1 || rotationParams.z0 === 1)
          ) {
            //            let dist = memo.z0x;
            //            if (rotationParams.z0 === 1) dist = memo.z1x;
            let dist = pageWidth; // hack
            return {
              r: 0,
              x: 0,
              y: 0,
              x1: dist,
              x4: dist,
              y1: 0,
              x2: pageWidth,
              y2: 0,
              x3: pageWidth,
              y3: bookHeight,
              y4: bookHeight,
              x5: dist,
              y5: bookHeight,
              immediate: true
              //              onRest: () => {
              //                onFinishTurnFromLeft()
              //              }
            };
          } else return result;
        } else if (i === index - 2) {
          return { ...nto, x: 0, display: "block" };
        } else if (i === index + 1) {
          return { bgDisplay: "none" };
        } else return;
      }
      // WORK ON RIGHT SIDE
      else if (side === "right") {
        if (index === i) {
          let setBg = false;
          if (rotationParams.z1 === 1) {
            // top corner
            x2 = rotationParams.z0x - pageWidth;
            x3 = rotationParams.z1x - pageWidth;
            y3 = rotationParams.z1y;
            x4 = pageWidth;
            y4 = bookHeight;
            x5 = 0;
            y5 = bookHeight;

            if (!down && !needFinishTurn) {
              x2 = pageWidth;
              y2 = 0;
              x3 = pageWidth;
              y3 = 0;
              x4 = pageWidth;
              y4 = bookHeight;
              x5 = 0;
              y5 = bookHeight;
            }

            const b = Math.abs(pageWidth - x2);
            const a = Math.abs(bookHeight - y3);
            bgRad = -((Math.atan(b / a) * 180) / Math.PI);
            bgHeight = Math.sqrt(a * a + b * b);
            bgPosY = bgHeight - bookHeight;
            setBg = true;
          } else if (rotationParams.z0 === 1) {
            // bottom corner
            x2 = pageWidth;
            y2 = 0;
            x3 = rotationParams.z0x - pageWidth;
            y3 = rotationParams.z0y;
            x4 = rotationParams.z1x - pageWidth;
            y4 = rotationParams.z1y;
            x5 = 0;
            y5 = bookHeight;

            if (!down && !needFinishTurn) {
              x3 = pageWidth;
              y3 = bookHeight;
              x4 = pageWidth;
              y4 = bookHeight;
              x5 = 0;
              y5 = bookHeight;
            }
          } else {
            // normal
            x2 = rotationParams.z0x - pageWidth;
            x3 = rotationParams.z1x - pageWidth;
            y3 = rotationParams.z1y;
            y4 = bookHeight;
            x5 = x4;
            y5 = y4;

            if (!down && !needFinishTurn) {
              x2 = pageWidth;
              y2 = 0;
              x3 = pageWidth;
              y3 = bookHeight;
              x4 = 0;
              y4 = bookHeight;
              x5 = 0;
              y5 = bookHeight;
            }
          }

          if (!setBg) {
            const b = Math.abs(x2 - x3);
            const a = bookHeight;
            bgRad = -90 + (Math.atan(a / b) * 180) / Math.PI;
            bgHeight = Math.sqrt(a * a + b * b);
            bgPosY = bgHeight - bookHeight;
          }

          let result = {
            ...nto,
            display: "block",
            x: pageWidth,
            x2,
            y2,
            x3,
            y3,
            x4,
            y4,
            x5,
            y5
          };

          if (
            !down &&
            needFinishTurn &&
            (rotationParams.z1 === 1 || rotationParams.z0 === 1)
          ) {
            return {
              r: 0,
              x: pageWidth,
              y: 0,
              x1: 0,
              y1: 0,
              x2: pageWidth - memo.x2,
              y2: 0,
              x3: pageWidth - memo.x2,
              y3: bookHeight,
              x4: 0,
              y4: bookHeight,
              x5: 0,
              y5: bookHeight,
              immediate: true
            };
          } else return result;
        } else if (i === index + 1) {
          if (rotationParams.x3 > rotationParams.x2) bgRad = -bgRad;
          bgPos = pageWidth - rotationParams.x2;
          bgDisplay = "block";

          let result = {
            ...nto,
            display: "block",
            z: 1,
            ...rotationParams,
            onRest: () => onRestFnRight(rotationParams.x)
          };

          if (!down && needFinishTurn) {
            if (rotationParams.z1 === 1 || rotationParams.z0 === 1) {
              return {
                r: 0,
                x: bookWidth - memo.x2 * 2,
                y: 0,
                x1: 0,
                y1: 0,
                x2: memo.x2,
                y2: 0,
                x3: memo.x2,
                y3: bookHeight,
                x4: 0,
                y4: bookHeight,
                x5: 0,
                y5: bookHeight,
                immediate: true,
                onRest: () => {
                  api.start(i => {
                    if (i === index) {
                      return {
                        x2: pageWidth - memo.x2,
                        x3: pageWidth - memo.x2,
                        immediate: true,
                        onRest: () => {
                          api.start(i => {
                            if (i === index) {
                              return {
                                immediate: false,
                                config: customConfig,
                                x2: 0,
                                x3: 0
                              };
                            }
                          });
                        }
                      };
                    }
                    if (i === index + 1) {
                      return result;
                    }
                  });
                }
              };
            } else return result;
          } else return result;
        } else if (i === index + 2) {
          return {
            index,
            bgPos,
            bgPosY,
            bgRad,
            bgHeight,
            bgDisplay,
            bgY2,
            display: "block",
            immediate: true,
            x: index === 0 && 0 ? -movement[0] : pageWidth
          };
        }
      } else return { index, onRest: null, display: "none", immediate: true };
    });

    if (down) {
      return memoRotationParams;
    }
    
  };
  const bind = useGesture(
    {
      onDrag: onDragHandler, // fires on drag
      onScroll: state => {
        return state;
      },
      onPinch: onHoverHandler ,
      onWheel:  onHoverHandler,
      onWheelCapture: onHoverHandler,
      onHover: onHoverHandler

    },
    {
      //enabled: previousWasFinished
    }
  );
  const content = springs.map(
    (
      {
        x,
        y,
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        x4,
        y4,
        x5,
        y5,
        z,
        bgPos,
        bgPosY,
        bgRad,
        bgHeight,
        bgDisplay,
        bgY2,
        display,
        r,
        scaleX,
        index
      },
      i
    ) => {
      return (
        <div key={i}>
          <animated.div
            key={i}
            style={{
              backgroundColor: pages[i],
              zIndex: z,
              display,
              backgroundImage:
                (i % 2 === 1 && i !== springs.length-1)
                  ? to([x2, bgRad], (x2, bgRad) => {
                      return `linear-gradient(to right,
                        #E6E6E6 0%,
                        #FFFFFF ${(x2 * 65) / pageWidth}%,
                        #E6E6E6 ${(x2 * 80) / pageWidth}%,
                        #D9D9D9 ${(x2 * 88) / pageWidth}%,
                        #FFFFFF 100%
                      )`;
                    })
                  : i !== index.value + 2 || true 
                  ? `linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%,rgba(184, 184, 184, 0) 60px)`
                  : null,
              backgroundPositionX: 0,
              WebkitClipPath: to(
                [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5],
                (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) => {
                  if (x5 === undefined) x5 = x4;
                  if (y5 === undefined) y5 = y4;
                  return `polygon(${x1}px ${y1}px, ${x2}px ${y2}px, ${x3}px ${y3}px, ${x4}px ${y4}px, ${x5}px ${y5}px )`;
                }
              ),

              transformOrigin: i % 2 === 0 ? pageWidth + "px 0px" : "0px 0px",
              transform: to(
                [x, y, r, scaleX],
                (x, y, r, scaleX) =>
                  `translateX(${x}px) translateY(${y}px) rotate(${r}rad) scaleX(${scaleX})`
              ),
              touchAction: 'none'
            }}
            className={`page page--${i} `}
            {...bind(i)}
          >
            <div
              dangerouslySetInnerHTML={{ __html: html[i] }}
            ></div>
          </animated.div>
          {false && i === index.value + 2 && (
            <animated.div
              className="shadow"
              style={{
                height: bgHeight,
                display: bgDisplay,
                left: pageWidth,
                WebkitClipPath: to(
                  [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, bgHeight, bgY2],
                  (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, bgHeight, bgY2) => {
                    y3 = y4 = y5 = bgHeight;
                    y2 = bgY2;
                    if (x5 === undefined) x5 = x4;
                    if (y5 === undefined) y5 = y4;
                    return `polygon(${x1}px ${y1}px, ${x2}px ${y2}px, ${x3}px ${y3}px, ${x4}px ${y4}px, ${x5}px ${y5}px )`;
                  }
                ),
                transform: to(
                  [bgRad, bgPos, bgPosY],
                  (bgRad, bgPos, bgPosY) =>
                    `rotate(${bgRad}deg) translateX(${bgPos}px) translateY(${bgPosY}px)`
                )
              }}
            ></animated.div>
          )}
        </div>
      );
    })
    return (
      <>
        <div id="book-container" style={{ width: bookWidth, height: bookHeight }}>
          {content}
        </div>
        {/* <div className="copy">
        Drag page to flip
        </div> */}
      </>
    );
  
  
}
export default StoryReader;