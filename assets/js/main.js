/**
 * Yahya Mohamed - Data Engineer Portfolio
 * Interactive Functionality & Smooth Animations
 */

// Marks that JS is available, so entrance animations only hide content
// when they can also reveal it again.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Sticky Header & Active Link Tracking
  // --------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // ScrollSpy using IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle
  // --------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a nav link is clicked
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Scroll Reveal Animations
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --------------------------------------------------------------------------
  // 4. Project Details Data & Modal View System
  // --------------------------------------------------------------------------
  const projectData = {
    'etl-pipeline': {
      title: 'Sales Data ETL Pipeline',
      badge: 'Practice Project',
      subtitle: 'Robust Python & SQL pipeline automating data extraction, cleansing, and warehouse loading.',
      tools: ['Python', 'Pandas', 'PostgreSQL', 'Data Cleaning', 'SQL Alchemy'],
      image: 'assets/images/project-etl.svg',
      pageUrl: 'projects/sales-etl-pipeline.html',
      problem: 'Raw e-commerce transaction data arrived in inconsistent, unformatted CSV exports riddled with null values, broken timestamps, corrupted currency formats, and duplicate rows.',
      solution: 'Engineered an automated Python ETL script leveraging Pandas for vectorized schema cleansing, type coercion, and deduplication. Structured normalized relational staging & production SQL tables with foreign key constraints, loading data safely using transactions.',
      pipelineSteps: [
        'Extraction: Ingests raw messy CSV dumps with automated schema validation.',
        'Transformation: Cleans string currency fields, parses heterogeneous datetime formats, handles null records, and computes clean sales margins.',
        'Loading: Batch inserts normalized records into PostgreSQL database with upsert / conflict-handling.'
      ],
      codeSample: `# Sample snippet from pipeline/transform.py
def transform_sales_batch(raw_df: pd.DataFrame) -> pd.DataFrame:
    """Cleanse, deduplicate and cast messy transaction records."""
    df = raw_df.drop_duplicates(subset=['transaction_id']).copy()
    
    # Standardize currency formatting
    df['amount'] = df['amount'].str.replace('$', '').astype(float)
    df['order_date'] = pd.to_datetime(df['order_date'], errors='coerce')
    
    # Filter anomalous records
    clean_df = df.dropna(subset=['order_date', 'customer_id'])
    return clean_df`
    },
    'sales-dashboard': {
      title: 'Sales Performance Dashboard',
      badge: 'Practice Project',
      subtitle: 'Executive BI dashboard on top of relational SQL reporting views tracking core revenue KPIs.',
      tools: ['SQL', 'Power BI', 'Tableau', 'Window Functions', 'KPI Analytics'],
      image: 'assets/images/project-dashboard.svg',
      pageUrl: 'projects/sales-dashboard.html',
      problem: 'Stakeholders needed clear, instant visibility into monthly revenue velocity, top-performing product categories, and regional customer growth without running manual ad-hoc database queries.',
      solution: 'Designed and deployed optimized SQL analytical views utilizing Common Table Expressions (CTEs) and Window Functions. Connected the curated data model to interactive Power BI / Tableau dashboards with dynamic date filtering and drill-down metrics.',
      pipelineSteps: [
        'Analytical Modeling: Authored performant SQL views calculating MoM growth and moving averages.',
        'Visual Hierarchy: Built high-contrast executive cards for Total Revenue ($248.5K), Total Orders, and AOV.',
        'Interactive Drilldowns: Implemented categorical decomposition trees and time-series trend forecasting.'
      ],
      codeSample: `-- Analytical SQL View for Monthly Revenue Trends
CREATE OR REPLACE VIEW analytics.vw_monthly_performance AS
SELECT 
    DATE_TRUNC('month', order_date) AS sales_month,
    product_category,
    SUM(sale_amount) AS gross_revenue,
    COUNT(DISTINCT order_id) AS total_orders,
    LAG(SUM(sale_amount), 1) OVER (
        PARTITION BY product_category 
        ORDER BY DATE_TRUNC('month', order_date)
    ) AS prev_month_revenue
FROM core.fact_sales
GROUP BY 1, 2;`
    },
    'api-collector': {
      title: 'Public API Data Collector',
      badge: 'Practice Project',
      subtitle: 'Scheduled daemon pulling daily public API feeds, storing history, and logging delta trends.',
      tools: ['Python', 'Requests', 'SQL', 'Scheduling / Cron', 'Time-Series DB'],
      image: 'assets/images/project-api.svg',
      pageUrl: 'projects/api-data-collector.html',
      problem: 'External public rate feeds and atmospheric weather indicators fluctuate continuously, but free APIs often lack historical query capabilities beyond immediate snapshots.',
      solution: 'Built an automated Python collector script scheduled to run daily via cron. Fetches payload data with exponential backoff retry logic, parses JSON, computes daily deltas against previous values, and persists immutable historical time-series entries.',
      pipelineSteps: [
        'Polling & Resilience: Issues authenticated HTTP requests with timeout guards and error logging.',
        'Data Parsing: Extracts target currency exchange benchmarks and weather parameters from JSON payloads.',
        'History Retention: Appends timestamped records into a dedicated SQL time-series table, tracking change metrics over time.'
      ],
      codeSample: `# Sample automated polling loop
import requests, schedule, time

def fetch_and_persist_rates():
    endpoint = "https://api.exchangerate.host/latest?base=USD"
    response = requests.get(endpoint, timeout=10)
    if response.status_code == 200:
        payload = response.json()
        rates = payload.get('rates', {})
        store_timeseries_record(rates)
        print(f"Logged {len(rates)} currencies at {payload['date']}")

# Run scheduled daily at 00:00
schedule.every().day.at("00:00").do(fetch_and_persist_rates)`
    }
  };

  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalMedia = document.getElementById('modalMedia');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalProblem = document.getElementById('modalProblem');
  const modalSolution = document.getElementById('modalSolution');
  const modalTools = document.getElementById('modalTools');
  const modalCode = document.getElementById('modalCode');
  const modalPageLink = document.getElementById('modalPageLink');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data || !modalOverlay) return;

    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;
    modalSubtitle.textContent = data.subtitle;
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;
    modalCode.textContent = data.codeSample;
    modalMedia.innerHTML = `<img src="${data.image}" alt="${data.title}">`;
    modalPageLink.setAttribute('href', data.pageUrl);

    modalTools.innerHTML = data.tools.map(tool => 
      `<span class="tool-tag">${tool}</span>`
    ).join('');

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Bind project card click handlers
  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', (e) => {
      // If user specifically clicked the direct link button, let it navigate
      if (e.target.closest('.direct-page-link')) {
        return;
      }
      const projectId = card.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --------------------------------------------------------------------------
  // 5. Skills Section: Velora word-by-word intro + sticky card reveals
  // --------------------------------------------------------------------------

  // Split the intro paragraph into words so they can blur-and-rise in sequence
  const paragraphObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.4,
    rootMargin: '0px 0px -20% 0px'
  });

  document.querySelectorAll('[data-split]').forEach(paragraph => {
    const words = paragraph.textContent.trim().split(/\s+/);
    paragraph.textContent = '';
    paragraph.classList.add('split-words');

    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'split-word';
      span.textContent = word;
      span.style.transitionDelay = `${index * 0.045}s`;
      paragraph.appendChild(span);
      paragraph.appendChild(document.createTextNode(' '));
    });

    paragraphObserver.observe(paragraph);
  });

  // Cards reveal their parts in sequence as each one enters the viewport
  const skillCardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.25,
    rootMargin: '0px 0px -10% 0px'
  });

  document.querySelectorAll('.skill-card').forEach(card => skillCardObserver.observe(card));

  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      console.log('Skill selected:', card.getAttribute('data-tools'));
    });
  });
});
