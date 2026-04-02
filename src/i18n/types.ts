export interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    programs: string;
    contact: string;
    signIn: string;
    intranet: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
      scroll: string;
    };
    mission: {
      title: string;
      description: string;
    };
    philosophy: {
      tagline: string;
      title: string;
      items: {
        title: string;
        description: string;
        icon: string;
      }[];
    };
    services: {
      tagline: string;
      title: string;
      items: {
        name: string;
        description: string;
        duration: string;
        level: string;
      }[];
    };
    testimonials: {
      tagline: string;
      title: string;
      items: {
        quote: string;
        name: string;
        location: string;
      }[];
    };
    cta: {
      title: string;
      description: string;
      button: string;
      note: string;
    };
  };
  about: {
    title: string;
    description: string;
    history: {
      title: string;
      content: string;
    };
  };
  programs: {
    title: string;
    description: string;
    list: {
      title: string;
      description: string;
    }[];
  };
  contact: {
    title: string;
    description: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
  };
  footer: {
    rights: string;
    language: string;
  };
}
