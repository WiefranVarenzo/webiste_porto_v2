(function () {
  const STORAGE_KEY = 'portfolio-editor-data-v1';

  const defaultValues = {
    'hero.line1': 'I turn complex problems',
    'hero.line2': 'into intelligent products',
    'hero.intro': 'Data Scientist and Machine Learning Engineer focused on practical AI, clear analysis, and products that people can actually use.',
    'work.kicker': '01 / Selected work',
    'work.title': 'A few things I’m proud to have built.',
    'work.lede': 'A focused selection—enough context to understand the problem, my role, and the result.',
    'work.more': 'More projects',
    'featured.title': 'NextGen',
    'featured.description': 'An AI and big-data recommendation system for Indonesian civil-servant competency development, built during my internship at the Ministry of Public Works.',
    'featured.role': 'Machine Learning Specialist',
    'featured.year': '2025',
    'featured.metaA': 'ML / GCP / Big Data',
    'featured.metaB': '2025',
    'featured.link': '#experience',
    'featured.imageA': 'assets/pu-capaian.png',
    'featured.imageB': 'assets/pu-cert.jpg',
    'card1.title': 'ChatTax',
    'card1.description': 'A tax assistant combining a fine-tuned Mistral 7B model with RAG to answer from current regulation documents.',
    'card1.metaA': 'GenAI',
    'card1.metaB': 'RAG / QLoRA',
    'card1.link': 'https://github.com/WiefranVarenzo/ChatTax',
    'card1.image': 'assets/chattax-chatbot.jpg',
    'card2.title': 'Anevia',
    'card2.description': 'An early anemia-detection web app using eye-image segmentation, designed to make screening more accessible.',
    'card2.metaA': 'Computer Vision',
    'card2.metaB': 'U-Net / ResNet50',
    'card2.link': 'https://github.com/Anevia-Capstone',
    'card2.image': 'assets/anevia.png',
    'archive.hero.title': 'More projects',
    'archive.hero.emphasis': 'in motion',
    'archive.hero.intro': 'A richer archive of machine learning, data storytelling, and applied AI work—each one designed to show the thinking behind the result.',
    'archive.section.title': 'Selected work beyond the featured cases.',
    'archive.section.lead': 'These are companion projects from my learning and experimentation journey—each one solving a small but meaningful problem with data and AI.',
    'archive.card1.title': 'Fashion Recommendation System',
    'archive.card1.description': 'Built a product recommendation system for fashion e-commerce using content-based filtering and collaborative approaches to suggest more relevant products.',
    'archive.card1.metaA': 'Recommendation',
    'archive.card1.metaB': 'TF-IDF · LSA',
    'archive.card1.link': 'https://github.com/WiefranVarenzo/Recommendation-System-Project',
    'archive.card1.image': 'assets/10.png',
    'archive.card2.title': 'BCA Review Sentiment Analysis',
    'archive.card2.description': 'Analyzed 144,000 Google Play reviews for BCA Mobile and compared multiple deep-learning models to determine the strongest sentiment classifier.',
    'archive.card2.metaA': 'NLP',
    'archive.card2.metaB': 'RCNN · GRU · LSTM',
    'archive.card2.link': 'https://github.com/WiefranVarenzo/Sentiment-Analysis-of-BCA-Mobile-Reviews-on-Google-Play-Store',
    'archive.card2.image': 'assets/8.png',
    'archive.card3.title': 'TellMe Emotion Analysis',
    'archive.card3.description': 'Used transformers and speech-to-text workflows for emotion analytics from audio and text, combining NLP with multimodal inputs.',
    'archive.card3.metaA': 'LLM',
    'archive.card3.metaB': 'BERT · Whisper',
    'archive.card3.link': 'https://github.com/WiefranVarenzo/TellMe',
    'archive.card3.image': 'assets/Bert.png',
    'archive.card4.title': 'Bank Fraud Detection',
    'archive.card4.description': 'Combined unsupervised clustering and supervised classification to detect suspicious bank transactions and segment customer behavior patterns.',
    'archive.card4.metaA': 'Risk',
    'archive.card4.metaB': 'K-Means · SVM',
    'archive.card4.link': 'https://github.com/WiefranVarenzo/Bank-Fraud-Detection-with-Unsupervised-and-Supervised-Learning',
    'archive.card4.image': 'assets/9.png',
    'font.kicker': '12',
    'font.body': '16',
    'font.heroTitle': '72',
    'font.sectionTitle': '54',
    'font.projectTitle': '40',
    'font.projectMeta': '11',
    'font.projectRole': '16',
    'font.projectDescription': '16',
    'font.archiveTitle': '56',
    customSections: [],
    customProjects: [
      {
        title: 'REKSA',
        tag: 'IoT',
        tag2: 'AI/ML',
        description: 'AI-IoT-based safety evaluation radar and workplace hazard detection system for dynamic hazard awareness and near-miss intelligence in industrial environments.',
        image: ['assets/reksa-helmet.jpg', 'assets/reksa-circuit.png'],
        inHomepage: true,
        inArchive: true,
        link: 'https://www.youtube.com/watch?v=aq8y6m_AiCI'
      }
    ]
  };

  function loadData() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const savedCustomProjects = Array.isArray(saved.customProjects) ? saved.customProjects : [];
      const savedCustomSections = Array.isArray(saved.customSections) ? saved.customSections : [];

      // Buat objek Map dari proyek tersimpan untuk pencarian cepat berdasarkan judul
      const savedProjectsMap = new Map();
      savedCustomProjects.forEach(project => {
        if (project && project.title) {
          savedProjectsMap.set(project.title, project);
        }
      });

      // Mulai dari nilai default
      const mergedCustomProjects = [...defaultValues.customProjects];

      // Iterasi proyek default. Jika ada proyek dengan judul yang sama di saved, timpa entri default.
      for (let i = 0; i < mergedCustomProjects.length; i++) {
        const defaultProject = mergedCustomProjects[i];
        if (savedProjectsMap.has(defaultProject.title)) {
          // Ganti entri default dengan versi yang disimpan
          mergedCustomProjects[i] = savedProjectsMap.get(defaultProject.title);
          savedProjectsMap.delete(defaultProject.title); // Hapus dari map agar tidak ditambahkan lagi nanti
        }
      }

      // Tambahkan sisa proyek dari saved (proyek baru yang tidak ada di default)
      mergedCustomProjects.push(...savedProjectsMap.values());

      // Logika untuk customSections tetap sama (menggantikan default jika ada yang disimpan)
      const mergedCustomSections = savedCustomSections.length ? savedCustomSections : defaultValues.customSections;

      console.log("Loaded data:", { // Logging tambahan untuk debug
        savedCustomProjects,
        mergedCustomProjects,
        savedCustomSections,
        mergedCustomSections
      });

      return {
        ...defaultValues,
        ...saved,
        customSections: mergedCustomSections,
        customProjects: mergedCustomProjects
      };
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      return { ...defaultValues };
    }
  }

  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('portfolio-editor-updated', { detail: data }));
  }

  function resolvePreviewSource(value) {
    const source = String(value || '').trim();
    if (!source) return '';

    const youtubeMatch = source.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtube\.com\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})/i);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
    }

    if (/youtube\.com|youtu\.be/i.test(source)) {
      return '';
    }

    return source;
  }

  function isMediaUrl(value) {
    if (!value) return false;
    const normalized = resolvePreviewSource(value);
    return /(?:\.mp4|\.webm|\.mov|\.ogg|\.gif|data:video|data:image)/i.test(normalized) || /(?:\.png|\.jpg|\.jpeg|\.webp|\.svg)/i.test(normalized) || /youtube\.com|youtu\.be/i.test(normalized);
  }

  function normalizeMediaSources(value) {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value
        .map((entry) => String(entry).trim())
        .filter(Boolean)
        .filter((entry) => entry !== 'null' && entry !== 'undefined');
    }

    const raw = String(value).trim();
    if (!raw) return [];

    if (raw.startsWith('[')) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed
            .map((entry) => String(entry).trim())
            .filter(Boolean)
            .filter((entry) => entry !== 'null' && entry !== 'undefined');
        }
      } catch (error) {
        // Fall back to comma parsing for older saved values.
      }
    }

    const parts = [];
    let current = '';
    raw.split(',').forEach((segment) => {
      const next = segment.trim();
      if (!next) return;
      if (!current) {
        current = next;
        return;
      }

      if (/^data:/i.test(current) && !/^data:/i.test(next)) {
        current += `,${next}`;
        return;
      }

      parts.push(current);
      current = next;
    });

    if (current) parts.push(current);

    return parts.filter((entry) => entry && entry !== 'null' && entry !== 'undefined');
  }

  function buildMotionMediaElement(sources, altText, kind) {
    const values = normalizeMediaSources(sources).map(resolvePreviewSource).filter(Boolean).slice(0, 10);
    if (!values.length) return null;

    const media = document.createElement(kind === 'section' ? 'div' : 'a');
    media.className = 'motion-media';
    media.dataset.sources = values.join(',');
    media.setAttribute('aria-label', altText || 'Media preview');

    if (kind !== 'section') {
      media.href = '#';
      media.classList.add('project-media');
      media.setAttribute('role', 'button');
    } else {
      media.classList.add('custom-section-media');
    }

    const frameA = document.createElement('img');
    frameA.className = 'motion-frame frame-a';
    frameA.src = values[0];
    frameA.alt = altText || 'Media preview';

    const frameB = document.createElement('img');
    frameB.className = 'motion-frame frame-b';
    frameB.src = values[1] || values[0];
    frameB.alt = altText || 'Media preview';

    const prev = document.createElement('span');
    prev.className = 'nav-zone nav-zone-prev';
    prev.setAttribute('aria-label', 'Previous preview');
    prev.setAttribute('role', 'button');
    prev.tabIndex = 0;

    const next = document.createElement('span');
    next.className = 'nav-zone nav-zone-next';
    next.setAttribute('aria-label', 'Next preview');
    next.setAttribute('role', 'button');
    next.tabIndex = 0;

    media.appendChild(frameA);
    media.appendChild(frameB);
    media.appendChild(prev);
    media.appendChild(next);

    if (kind !== 'section') {
      const hint = document.createElement('span');
      hint.className = 'media-hint';
      hint.textContent = 'Preview';
      media.appendChild(hint);
    }

    return media;
  }

  function createMediaNode(url, altText, kind) {
    const sources = normalizeMediaSources(url).map(resolvePreviewSource).filter(Boolean);
    if (sources.length > 1) {
      return buildMotionMediaElement(sources, altText, kind);
    }

    const source = sources[0];
    if (!source) {
      const fallback = document.createElement('div');
      fallback.className = 'custom-empty-media';
      fallback.textContent = 'Video preview';
      return fallback;
    }
    const isVideo = /(?:\.mp4|\.webm|\.mov|\.ogg|data:video)/i.test(source || '');
    if (kind === 'section' && isVideo) {
      const video = document.createElement('video');
      video.src = source;
      video.alt = altText || 'Custom section media';
      video.controls = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = false;
      return video;
    }
    const img = document.createElement('img');
    img.src = source;
    img.alt = altText || 'Custom media';
    if (isVideo && kind === 'project') {
      img.src = source;
      img.alt = altText || 'Project media';
    }
    return img;
  }

  function renderCustomSections() {
    const data = loadData();
    const roots = document.querySelectorAll('[data-custom-sections-root]');
    roots.forEach((root) => {
      root.innerHTML = '';
      const sections = Array.isArray(data.customSections) ? data.customSections : [];
      sections.forEach((item, index) => {
        const article = document.createElement('section');
        article.className = 'custom-section reveal';

        const heading = document.createElement('div');
        heading.className = 'section-heading';

        const kicker = document.createElement('p');
        kicker.className = 'kicker';
        kicker.textContent = item.kicker || `0${index + 1} / Custom section`;

        const title = document.createElement('h2');
        title.textContent = item.title || 'New section';

        const description = document.createElement('p');
        description.textContent = item.description || 'Custom section description';

        heading.appendChild(kicker);
        heading.appendChild(title);
        heading.appendChild(description);
        article.appendChild(heading);

        const mediaValue = item.image || item.images;
        if (mediaValue) {
          const mediaWrap = document.createElement('div');
          mediaWrap.className = 'custom-section-media';
          const media = createMediaNode(mediaValue, item.title || 'Custom section media', 'section');
          if (media) mediaWrap.appendChild(media);
          article.appendChild(mediaWrap);
        }

        if (item.link) {
          const actionWrap = document.createElement('div');
          actionWrap.className = 'custom-section-action';
          const link = document.createElement('a');
          link.className = 'button primary';
          link.href = item.link;
          link.target = item.link.startsWith('http') ? '_blank' : '_self';
          link.rel = item.link.startsWith('http') ? 'noreferrer' : '';
          link.textContent = 'Open link ↗';
          actionWrap.appendChild(link);
          article.appendChild(actionWrap);
        }

        root.appendChild(article);
      });
    });
  }

  function renderCustomProjects() {
    const data = loadData();
    const projectRoots = document.querySelectorAll('[data-custom-projects-root]');
    // If there's a pre-existing archive container used for the static showcase, prefer that
    const archiveMain = document.querySelector('.projects-showcase:not([data-custom-projects-root])');
    projectRoots.forEach((root) => {
      const scope = root.dataset.customProjectsScope || 'home';
      // decide which DOM container we will actually render into
      const target = scope === 'archive' && archiveMain ? archiveMain : root;
      // remove previously generated custom project nodes inside the target, but keep any static HTML that authors placed
      Array.from(target.querySelectorAll('[data-generated="true"]')).forEach((n) => n.remove());
      const projects = Array.isArray(data.customProjects) ? data.customProjects : [];
      const visibleProjects = projects.map((project) => {
        const normalized = {
          ...project,
          title: String(project?.title || '').trim() || 'Custom project',
          tag: String(project?.tag || '').trim() || 'Custom',
          tag2: String(project?.tag2 || '').trim() || 'Portfolio',
          description: String(project?.description || '').trim() || 'Custom project description',
          link: String(project?.link || '').trim() || '#',
          image: project?.image || project?.images || []
        };

        const showOnHome = project?.inHomepage !== false;
        const showOnArchive = project?.inArchive !== false;
        if (scope === 'archive') return showOnArchive ? normalized : null;
        return showOnHome ? normalized : null;
      }).filter(Boolean);

      visibleProjects.forEach((project) => {
        const article = document.createElement('article');
        article.className = scope === 'archive' ? 'project-showcase-card reveal' : 'project project-featured reveal';

        const mediaValue = project.image || project.images;
        const mediaSources = normalizeMediaSources(mediaValue);
        const mediaWrap = buildMotionMediaElement(mediaSources.length ? mediaSources : [], project.title || 'Project media', 'project') || (() => {
          const fallback = document.createElement('div');
          fallback.className = 'project-media';
          const placeholder = document.createElement('div');
          placeholder.className = 'custom-empty-media';
          placeholder.textContent = 'Add image or video';
          fallback.appendChild(placeholder);
          return fallback;
        })();

        if (mediaWrap.tagName === 'A') {
          mediaWrap.href = project.link && project.link !== '#' ? project.link : '#';
          mediaWrap.classList.add('project-media');
          if (project.link && project.link !== '#' && project.link.startsWith('http')) {
            mediaWrap.target = '_blank';
            mediaWrap.rel = 'noreferrer';
          }
        } else {
          mediaWrap.classList.add('project-media');
        }

        if (!mediaWrap.querySelector('.media-hint')) {
          const hint = document.createElement('span');
          hint.className = 'media-hint';
          hint.textContent = 'Preview';
          mediaWrap.appendChild(hint);
        }

        const copy = document.createElement('div');
        copy.className = 'project-copy';

        const meta = document.createElement('div');
        meta.className = 'project-meta';
        const metaA = document.createElement('span');
        metaA.textContent = project.tag || 'Custom';
        const metaB = document.createElement('span');
        metaB.textContent = project.tag2 || 'Portfolio';
        meta.appendChild(metaA);
        meta.appendChild(metaB);

        const title = document.createElement('h3');
        const titleText = project.title || 'Custom project';

        if (project.link && project.link !== '#') {
          const titleLink = document.createElement('a');
          titleLink.href = project.link;
          titleLink.target = project.link.startsWith('http') ? '_blank' : '_self';
          titleLink.rel = project.link.startsWith('http') ? 'noreferrer' : '';
          titleLink.setAttribute('aria-label', `Open ${titleText}`);
          titleLink.textContent = '↗';
          title.textContent = titleText;
          title.appendChild(document.createTextNode(' '));
          title.appendChild(titleLink);
        } else {
          title.textContent = titleText;
        }

        const description = document.createElement('p');
        description.textContent = project.description || 'Custom project description';

        copy.appendChild(meta);
        copy.appendChild(title);
        copy.appendChild(description);

        if (scope === 'archive' && project.link && project.link !== '#') {
          const linksWrap = document.createElement('div');
          linksWrap.className = 'project-links';
          const link = document.createElement('a');
          link.href = project.link;
          link.target = project.link.startsWith('http') ? '_blank' : '_self';
          link.rel = project.link.startsWith('http') ? 'noreferrer' : '';
          link.textContent = project.link.startsWith('http') ? 'Project link ↗' : 'Open project ↗';
          linksWrap.appendChild(link);
          copy.appendChild(linksWrap);
        }

        article.appendChild(mediaWrap);
        article.appendChild(copy);
        // mark generated so we can remove these on next render without touching static content
        article.dataset.generated = 'true';
        // If this is the only generated project in the homepage grid, make it use the inline-featured layout
        try {
          const targetParent = target || root;
          const existingCount = targetParent.querySelectorAll('article').length;
          if (scope === 'home' && existingCount === 0) {
            article.classList.add('project-featured--inline');
            // Try to insert right after the main featured card so it becomes visually identical
            const featured = document.querySelector('.project.project-featured:not([data-generated])');
            if (featured && featured.parentNode) {
              featured.parentNode.insertBefore(article, featured.nextSibling);
            } else {
              targetParent.appendChild(article);
            }
          } else {
            targetParent.appendChild(article);
          }
        } catch (e) {
          root.appendChild(article);
        }
      });
    });
  }

  function applyContent() {
    const data = loadData();

    document.querySelectorAll('[data-edit-key]').forEach((node) => {
      const key = node.dataset.editKey;
      if (!(key in data)) return;
      const value = data[key] || '';
      if (node.tagName === 'IMG') {
        node.src = value;
      } else if (node.tagName === 'A') {
        node.textContent = value;
      } else if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        node.value = value;
      } else {
        const nestedLinks = Array.from(node.querySelectorAll('a')).map((a) => ({ href: a.getAttribute('href'), text: a.textContent }));
        // #region agent log
        if (nestedLinks.length) fetch('http://127.0.0.1:7784/ingest/9f98281f-b8f4-415e-aff5-705466cff9cc',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'70a942'},body:JSON.stringify({sessionId:'70a942',runId:'pre-fix',hypothesisId:'B',location:'portfolio-editor.js:applyContent:editKey',message:'innerHTML will wipe nested title links',data:{page:location.pathname,key,value,nestedLinks},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        node.innerHTML = value;
      }
    });

    document.querySelectorAll('[data-media-key]').forEach((img) => {
      const key = img.dataset.mediaKey;
      if (key in data && data[key]) {
        const sources = normalizeMediaSources(data[key]);
        if (sources.length) {
          img.src = sources[0];
        }
      }
    });

    document.querySelectorAll('.motion-media').forEach((media) => {
      const sources = normalizeMediaSources(media.dataset.sources || '');
      const childSources = Array.from(media.querySelectorAll('[data-media-key]')).flatMap((node) => normalizeMediaSources(data[node.dataset.mediaKey] || ''));
      const finalSources = sources.length ? sources : childSources;
      if (!finalSources.length) return;
      media.dataset.sources = finalSources.join(',');

      const frames = media.querySelectorAll('.motion-frame');
      if (frames[0] && finalSources[0]) frames[0].src = finalSources[0];
      if (frames[1] && finalSources[1]) frames[1].src = finalSources[1];
      else if (frames[1] && finalSources[0]) frames[1].src = finalSources[0];
    });

    document.querySelectorAll('[data-link-key]').forEach((node) => {
      const key = node.dataset.linkKey;
      if (key in data && data[key]) node.href = data[key];
    });

    // #region agent log
    fetch('http://127.0.0.1:7784/ingest/9f98281f-b8f4-415e-aff5-705466cff9cc',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'70a942'},body:JSON.stringify({sessionId:'70a942',runId:'pre-fix',hypothesisId:'A,C',location:'portfolio-editor.js:applyContent',message:'link overlay coverage',data:{page:location.pathname,savedCard1:data['card1.link'],savedArchive1:data['archive.card1.link'],linkKeyCount:document.querySelectorAll('[data-link-key]').length,linkKeys:Array.from(document.querySelectorAll('[data-link-key]')).map((n)=>({key:n.dataset.linkKey,href:n.href})),staticProjectLinks:Array.from(document.querySelectorAll('.project-links a')).map((a)=>({href:a.href,hasLinkKey:Boolean(a.dataset.linkKey)})),titleArrows:Array.from(document.querySelectorAll('h3 a')).map((a)=>({href:a.href,parentKey:a.parentElement&&a.parentElement.dataset.editKey,hasLinkKey:Boolean(a.dataset.linkKey)}))},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    renderCustomSections();
    renderCustomProjects();
  }

  function applyFonts() {
    const data = loadData();
    document.documentElement.style.setProperty('--editor-kicker-size', `${Number(data['font.kicker']) || 12}px`);
    document.documentElement.style.setProperty('--editor-body-size', `${Number(data['font.body']) || 16}px`);
    document.documentElement.style.setProperty('--editor-hero-title-size', `${Number(data['font.heroTitle']) || 72}px`);
    document.documentElement.style.setProperty('--editor-section-title-size', `${Number(data['font.sectionTitle']) || 54}px`);
    document.documentElement.style.setProperty('--editor-project-title-size', `${Number(data['font.projectTitle']) || 40}px`);
    document.documentElement.style.setProperty('--editor-project-meta-size', `${Number(data['font.projectMeta']) || 11}px`);
    document.documentElement.style.setProperty('--editor-project-role-size', `${Number(data['font.projectRole']) || 16}px`);
    document.documentElement.style.setProperty('--editor-project-description-size', `${Number(data['font.projectDescription']) || 16}px`);
    document.documentElement.style.setProperty('--editor-archive-title-size', `${Number(data['font.archiveTitle']) || 56}px`);
  }

  function refreshPortfolio() {
    console.log("Refreshing portfolio content and fonts..."); // Logging tambahan untuk debug
    applyFonts();
    applyContent();
  }

  function initPortfolioEditor() {
    console.log("Initializing portfolio editor..."); // Logging tambahan untuk debug
    applyFonts();
    applyContent();

    // Hapus listener lama (jika ada) untuk mencegah duplikasi
    window.removeEventListener('storage', refreshPortfolio);
    window.removeEventListener('portfolio-editor-updated', refreshPortfolio);

    // Tambahkan listener kembali
    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEY) {
        console.log("Storage event detected, refreshing..."); // Logging tambahan
        refreshPortfolio();
      }
    });

    window.addEventListener('portfolio-editor-updated', (event) => {
        console.log("Custom event 'portfolio-editor-updated' detected, refreshing..."); // Logging tambahan
        refreshPortfolio();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioEditor);
  } else {
    initPortfolioEditor();
  }

  window.PORTFOLIO_EDITOR = {
    STORAGE_KEY,
    defaultValues,
    loadData,
    saveData,
    applyContent,
    applyFonts,
    reset: () => {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };
})();
