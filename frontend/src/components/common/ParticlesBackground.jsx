import { useEffect, useRef, useCallback } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useApp } from "../../context/AppContext";

const PARTICLES_CONTAINER_ID = "particles-container";

const ParticlesBackground = ({ particleCount, interactive = true }) => {
  const { isDarkMode } = useApp();
  const particlesInstanceRef = useRef(null);
  const engineLoadedRef = useRef(false);

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
        if (!engineLoadedRef.current) {
          try {
            await loadSlim(tsParticles);
          } catch (slimError) {
            // Fallback to full loader if slim bundle fails in production chunks.
            const { loadFull } = await import("tsparticles");
            await loadFull(tsParticles);
            console.warn(
              "Particles slim loader failed, switched to full loader:",
              slimError,
            );
          }

          engineLoadedRef.current = true;
        }

        if (!isMounted) return;

        if (particlesInstanceRef.current) {
          particlesInstanceRef.current.destroy();
          particlesInstanceRef.current = null;
        }

        const colors = getColors();

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
                resize: true,
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
      className="fixed inset-0 z-0 pointer-events-none"
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
