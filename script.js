window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  // step 1: Initialize Locomotive Scroll
  const scroller = document.querySelector("[data-scroll-container]");
  const locoScroll = new LocomotiveScroll({
    el: scroller,
    smooth: true,
    getDirection: true,
    direction: "horizontal",
    smartphone: {
      smooth: true,
      direction: "horizontal",
    },
    tablet: {
      smooth: true,
      direction: "horizontal",
    },
  });

  // Start Locomotive Scroll after a delay
  locoScroll.stop();
  setTimeout(() => {
    locoScroll.start();
  }, 1000);

  // step 2: GSAP ScrollTrigger integration
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    scrollLeft(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.x;
    },
    getBoundingClientRect() {
      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scroller.style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.defaults({
    scroller: scroller,
  });

  // step 3: Vertical scroll section animation
  const scrollTween = gsap.to(".anim-wrap", {
    scrollTrigger: {
      trigger: ".vertical",
      start: "left left",
      end: "+=" + document.querySelector(".anim-wrap").scrollHeight,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: true,
      horizontal: true,
      invalidateOnRefresh: true,
      refreshPriority: 1,
    },
    y: () => {
      return (
        document.querySelector(".anim-wrap").scrollHeight - window.innerHeight
      );
    },
    ease: "none",
  });

  const gsapHImg = gsap.utils.toArray(".image.horizontal_img");

  gsapHImg.forEach((gsHImg) => {
    const itemHImg = gsHImg.querySelector(".image_bl");

    gsap.to(itemHImg, {
      scrollTrigger: {
        trigger: gsHImg,
        start: "left right",
        end: "right left",
        scrub: true,
        horizontal: false,
        refreshPriority: 1,
        containerAnimation: scrollTween,
      },
      y: 210,
      ease: "none",
    });

    const gsapVs = gsap.utils.toArray(".vertical .inner-section");

    gsapVs.forEach((gsVs) => {
      const itemVImg = gsVs.querySelector(".title");
      const title = gsVs.querySelector(".title");

      gsap.to(itemVImg, {
        scrollTrigger: {
          trigger: gsVs,
          start: "left right",
          end: "right left",
          scrub: true,
          horizontal: false,
          refreshPriority: 1,
          containerAnimation: scrollTween,
        },
        y: 210,
        ease: "none",
      });

      // step 6: Vertical title parallax effect
      gsap.to(title, {
        scrollTrigger: {
          trigger: gsVs,
          start: "left right",
          end: "right left",
          scrub: 1.5,
          horizontal: false,
          refreshPriority: 1,
          containerAnimation: scrollTween,
        },
        y: 85,
        ease: "none",
      });
    });
  });

  // Refresh ScrollTrigger after animations are added
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
});
