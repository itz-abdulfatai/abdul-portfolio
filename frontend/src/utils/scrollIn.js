export const scrollToSection = (id, behavior = 'instant') => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior, block: "start" });
    }
  };