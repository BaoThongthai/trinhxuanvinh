console.clear();

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline();
let marquee = document.querySelector(".marquee");
let content = document.querySelector(".marquee__content");
let items = document.querySelectorAll(".marquee__item");
let tlLength = items.length * 2;

// animation timeline
tl.to(".marquee__content", tlLength, {
  xPercent: -100,
  repeat: -1,
  ease: "none"
});

let currentScale = 1;
let scaleTl;

// scroll trigger
ScrollTrigger.create({
  markers: true,
  trigger: marquee,
  onUpdate: (self) => {
    if (self.direction == 1) {
      isUpdated = true;
      let tScale = self.getVelocity() / 200;
      if (tScale > currentScale) {
        currentScale = tScale;
        scaleTl && scaleTl.kill();
        scaleTl = gsap
          .timeline({
            deafults: {
              ease: "power2.out"
            },
            onComplete: () => {
              currentScale = 1;
              scaleTl.kill();
            }
          })
          .to(tl, {
            duration: 0.2,
            timeScale: tScale,
              ease: "power2.out"
          })
          .to(
            tl,
            {
              timeScale: 1,
              duration: 1,
              ease: "none"
            },
            "+=1"
          );
      }
    }
  }
});