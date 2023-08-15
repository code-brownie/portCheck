var timeout;
function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}
init();
// gsap for heading animation
const t1 = gsap.timeline();
t1.to(".preloader", {
  duration: 1.3,
  y: "-100vh",
  ease: "expo.out",
  delay: 3.5,
});
t1.set(".preloader", { display: "none" });
t1.from(".nav", {
  y: "-10",
  opacity: 0,
  duration: 1,
  ease: Expo.easeInOut,
}).to(".bounding_elem", {
  y: 0,
  duration: 2,
  stagger: 0.2,
  delay: -1,
  ease: Expo.easeInOut,
});
t1.fromTo(
  ".hero-footer",
  {
    opacity: 0,
    y: 15,
  },
  { opacity: 1, y: 0 },
  "<70%"
);
// heading animation ends here

// cursor animation
const cursorskew = () => {
  var xscale = 1;
  var yscale = 1;

  window.addEventListener("mousemove", (dets) => {
    clearTimeout(timeout);
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY);

    const circle = document.querySelector(".mini-circle");
    const circleSize = 15; // Set the size of the mini circle (same as your CSS)

    const circleX = dets.clientX - circleSize / 2;
    const circleY = dets.clientY - circleSize / 2;

    mousefollower(xscale, yscale);
    timeout = setTimeout(() => {
      circle.style.transform = `translate(${circleX}px, ${circleY}px) scale(${1},${1})`;
    }, 100);
  });
};

const mousefollower = (xscale, yscale) => {
  const ms = document.querySelector(".mini-circle");
  document.querySelectorAll(".elem").forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      ms.style.opacity = "0";
    });
    elem.addEventListener("mouseleave", () => {
      ms.style.opacity = "100";
    });
  });
  window.addEventListener("mousemove", (dets) => {
    // console.log(dets.clientX, dets.clientY);

    ms.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
  });
};

mousefollower();
cursorskew();
// cursor animation end here
// Image portion to move

document.querySelectorAll(".elem").forEach((elem) => {
  var rotate = 0;
  var rotdiff = 0;
  elem.addEventListener("mouseleave", () => {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });
  elem.addEventListener("mousemove", (dets) => {
    rotdiff = dets.clientX - rotate;
    rotate = dets.clientX;

    //console.log(elem.getBoundingClientRect().top)
    var diff = dets.clientY - elem.getBoundingClientRect().top;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, rotdiff),
    });
  });
});
const menuFunction = () => {
  const tl = gsap.timeline();

  tl.to(".s2", { y: 27, ease: "power4.out", duration: 0.3 });
  tl.to(".b", {
    y: 26,
    x: 20,
    stagger: 0.06,
    ease: "power4.out",
    duration: 0.3,
  });
};
// image animation ends here

// Second elems
gsap.from(".second", {
  opacity: 0,
  y: 200,
  duration: 1,
  ease: "Back.easeOut",
  scrollTrigger: {
    trigger: ".elem-first",
    scroller: ".main",
    start: "top 195%",
    end: "bottom 1000%",
  },
});

const date = new Date();

// Get the current hours and minutes
const hours = String(date.getHours()).padStart(2, "0");
const minutes = String(date.getMinutes()).padStart(2, "0");

// Format the time as "hh:mm"
const timeFormat = `${hours}:${minutes}`;

console.log("Current time:", timeFormat);

document.querySelector(".footer-left .date").innerHTML = `${timeFormat}  IST`;

const arrow = document.querySelector("i");
arrow.addEventListener("click", function () {
  const tl = gsap.timeline();

  tl.to(".b", {
    y: -27,
    x: 20,
    stagger: 0.06,
    ease: "power4.out",
    duration: 0.3,
  });
  tl.to(".s2", { y: -2, ease: "power4.out", duration: 0.3 });
});

const arrowIcons = document.querySelectorAll(".hero-footer .circle");
arrowIcons.forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    const arrow = gsap.timeline();
    arrow.to(".hero-footer .circle i", {
      y: 50,
      duration: 0.2,
      ease: "power1",
    });
    arrow.to(".hero-footer .circle i", {
      y: 0,
      duration: 0.2,
      ease: "power1",
    });
  });
});

document.querySelectorAll(".elem").forEach((elem) => {
  const viewText = elem.querySelector(".view-text");
  const ms = document.querySelector(".mini-circle");
  // elem.style.zIndex="30"
  ms.style.mixBlendMode = "none";

  elem.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX - elem.getBoundingClientRect().left;
    const mouseY = event.clientY - elem.getBoundingClientRect().top;

    viewText.style.transform = `translate(-50%, calc(-100% - 10px)) translate(${mouseX}px, ${mouseY}px)`;
  });

  elem.addEventListener("mouseleave", () => {
    viewText.style.transform = "translate(-50%, -100%) translate(0, 0)";
  });
});



