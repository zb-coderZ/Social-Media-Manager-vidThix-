import { useEffect, useRef, useCallback } from "react";
import { useApp } from "../../context/AppContext";

const PARTICLES_CONTAINER_ID = "particles-container";

const ParticlesBackground = ({ particleCount, interactive = true }) => {
  const { isDarkMode } = useApp();
  const particlesInstanceRef = useRef(null);

  const getParticleCount = useCallback(() => {
    if (particleCount) return particleCount;
    if (typeof window === "undefined") return 80;

    const width = window.innerWidth;
    if (width < 768) return 50;
    if (width < 1024) return 75;
    return 110;
  }, [particleCount]);

  const getColors = useCallback(() => {
    if (isDarkMode) {
      return {
        particle: "rgba(168, 85, 247, 0.9)",
        link: "rgba(251, 191, 36, 0.7)",
      };
    }

    return {
      particle: "rgba(147, 51, 234, 0.9)",
      link: "rgba(217, 119, 6, 0.7)",
    };
  }, [isDarkMode]);

  useEffect(() => {
    let isMounted = true;

    const initParticles = async () => {
      try {
        console.log("🚀 Starting particle initialization...");

        // Import engine from @tsparticles/engine (the core engine)
        const { tsParticles } = await import("@tsparticles/engine");
        const { loadSlim } = await import("@tsparticles/slim");

        console.log(
          "📦 Modules imported - Engine:",
          !!tsParticles,
          "Slim:",
          !!loadSlim,
        );

        if (!tsParticles) {
          throw new Error(
            "tsParticles engine not found from @tsparticles/engine",
          );
        }

        // Load the slim bundle into the engine
        await loadSlim(tsParticles);
        console.log("✨ Slim bundle loaded into engine");

        if (!isMounted) return;

        if (particlesInstanceRef.current) {
          particlesInstanceRef.current.destroy();
          particlesInstanceRef.current = null;
        }

        const colors = getColors();
        console.log("🎨 Particles initializing with colors:", colors);

        particlesInstanceRef.current = await tsParticles.load({
          id: PARTICLES_CONTAINER_ID,
          options: {
            background: {
              color: "transparent",
            },
            fpsLimit: 60,
            detectRetina: true,
            particles: {
              color: {
                value: colors.particle,
              },
              links: {
                color: colors.link,
                distance: 150,
                enable: true,
                opacity: 0.95,
                width: 1.5,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: true,
                speed: 2.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: getParticleCount(),
              },
              opacity: {
                value: {
                  min: 0.7,
                  max: 1,
                },
              },
              shape: {
                type: "circle",
              },
              size: {
                value: {
                  min: 2.5,
                  max: 5.5,
                },
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: interactive,
                  mode: "repulse",
                },
                resize: {
                  enable: true,
                },
              },
              modes: {
                repulse: {
                  distance: 90,
                  duration: 0.35,
                },
              },
            },
          },
        });
        console.log("✅ Particles loaded successfully!");
      } catch (error) {
        console.error("❌ Error initializing particles:", error);
      }
    };

    initParticles();

    return () => {
      isMounted = false;

      if (particlesInstanceRef.current) {
        particlesInstanceRef.current.destroy();
        particlesInstanceRef.current = null;
      }
    };
  }, [isDarkMode, interactive, particleCount, getColors, getParticleCount]);

  return (
    <div
      id={PARTICLES_CONTAINER_ID}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default ParticlesBackground;

// Add diagnostic info to window for debugging
if (typeof window !== "undefined") {
  setTimeout(() => {
    const container = document.getElementById("particles-container");
    const canvas = container?.querySelector("canvas");
    console.log("🔍 DOM Diagnostic:");
    console.log("  Container found:", !!container);
    console.log("  Canvas found:", !!canvas);
    if (canvas) {
      console.log("  Canvas size:", {
        width: canvas.width,
        height: canvas.height,
      });
      console.log(
        "  Canvas visible:",
        canvas.offsetHeight > 0 && canvas.offsetWidth > 0,
      );

      // Check canvas context and drawing
      const ctx = canvas.getContext("2d");
      console.log("  Canvas 2D context:", !!ctx);

      // Check if canvas has any pixel data (is being drawn to)
      const imageData = ctx?.getImageData(0, 0, 1, 1);
      console.log("  Canvas has pixel data:", !!imageData);

      // Log canvas computed styles
      const styles = window.getComputedStyle(canvas);
      console.log("  Canvas display:", styles.display);
      console.log("  Canvas position:", styles.position);
      console.log("  Canvas width (CSS):", styles.width);
      console.log("  Canvas height (CSS):", styles.height);

      // Check parent div styles
      const parentStyles = window.getComputedStyle(container);
      console.log("  Parent z-index:", parentStyles.zIndex);
      console.log("  Parent position:", parentStyles.position);
    }
  }, 1000);
}
