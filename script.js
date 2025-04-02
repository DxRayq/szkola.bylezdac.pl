document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Populate assignments on archive page
  const assignmentsContainer = document.getElementById('assignmentsContainer');
  if (assignmentsContainer) {
    renderAssignments(assignments);
    
    // Setup search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
      filterAssignments();
    });
    
    // Setup tag filters
    const tagFilters = document.querySelectorAll('.tag-filter');
    tagFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        // Remove active class from all filters
        tagFilters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        this.classList.add('active');
        // Filter assignments
        filterAssignments();
      });
    });
  }
});

// Function to render assignments
function renderAssignments(assignmentsToRender) {
  const assignmentsContainer = document.getElementById('assignmentsContainer');
  if (!assignmentsContainer) return;
  
  assignmentsContainer.innerHTML = '';
  
  if (assignmentsToRender.length === 0) {
    assignmentsContainer.innerHTML = '<p class="text-center">Nie znaleziono zadań spełniających kryteria.</p>';
    return;
  }
  
  assignmentsToRender.forEach(assignment => {
    const difficultyText = assignment.difficulty === 'easy' ? 'Łatwy' : 
                           assignment.difficulty === 'medium' ? 'Średni' : 'Trudny';
    
    const card = document.createElement('div');
    card.className = 'assignment-card';
    card.innerHTML = `
      <h3>${assignment.title}</h3>
      <p>${assignment.description}</p>
      <div class="assignment-tags">
        ${assignment.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        <span class="difficulty ${assignment.difficulty}">${difficultyText}</span>
      </div>
      <div class="assignment-date">Data dodania: ${assignment.date}</div>
    `;
    
    // Add click event to navigate to assignment detail
    card.addEventListener('click', function() {
      localStorage.setItem('currentAssignment', JSON.stringify(assignment));
      window.location.href = `assignment.html?id=${assignment.id}`;
    });
    
    assignmentsContainer.appendChild(card);
  });
}

// Function to filter assignments based on search and tag filters
function filterAssignments() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const activeFilter = document.querySelector('.tag-filter.active').dataset.tag;
  
  const filteredAssignments = assignments.filter(assignment => {
    // Check if assignment title or description matches search term
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm) || 
                         assignment.description.toLowerCase().includes(searchTerm);
    
    // Check if assignment has the selected tag
    const matchesTag = activeFilter === 'all' || assignment.tags.includes(activeFilter);
    
    return matchesSearch && matchesTag;
  });
  
  renderAssignments(filteredAssignments);
}

// For assignment detail page
const params = new URLSearchParams(window.location.search);
const assignmentId = params.get('id');

if (assignmentId && window.location.pathname.includes('assignment.html')) {
  let currentAssignment = JSON.parse(localStorage.getItem('currentAssignment'));
  
  // If not found in localStorage, get it from the assignments array
  if (!currentAssignment) {
    currentAssignment = assignments.find(a => a.id === assignmentId);
  }
  
  if (currentAssignment) {
    // Populate assignment detail page
    document.title = `${currentAssignment.title} - bylezdac`;
    
    // Populate assignment header
    const assignmentHeader = document.querySelector('.assignment-header');
    if (assignmentHeader) {
      const difficultyText = currentAssignment.difficulty === 'easy' ? 'Łatwy' : 
                           currentAssignment.difficulty === 'medium' ? 'Średni' : 'Trudny';
      
      assignmentHeader.innerHTML = `
        <h1>${currentAssignment.title}</h1>
        <p>${currentAssignment.description}</p>
        <div class="assignment-tags">
          ${currentAssignment.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          <span class="difficulty ${currentAssignment.difficulty}">${difficultyText}</span>
        </div>
        <div class="assignment-date">Data dodania: ${currentAssignment.date}</div>
      `;
    }
    
    // Setup tabs functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all tab contents
        tabContents.forEach(content => {
          content.style.display = 'none';
        });
        
        // Show selected tab content
        const tabId = this.dataset.tab;
        document.getElementById(`${tabId}-content`).style.display = 'block';
      });
    });
    
    // Show preview tab by default
    if (tabs.length > 0) {
      tabs[0].click();
    }
    
    // Populate code tabs
    if (currentAssignment.code) {
      // Populate HTML code
      if (currentAssignment.code.html) {
        const htmlCodeBlock = document.querySelector('#html-content pre code');
        if (htmlCodeBlock) {
          htmlCodeBlock.textContent = currentAssignment.code.html;
        }
      }
      
      // Populate CSS code
      if (currentAssignment.code.css) {
        const cssCodeBlock = document.querySelector('#css-content pre code');
        if (cssCodeBlock) {
          cssCodeBlock.textContent = currentAssignment.code.css;
        }
      }
      
      // Populate JS code
      if (currentAssignment.code.js) {
        const jsCodeBlock = document.querySelector('#js-content pre code');
        if (jsCodeBlock) {
          jsCodeBlock.textContent = currentAssignment.code.js;
        }
      }
      
      // Setup iframe for preview
      const previewIframe = document.querySelector('#preview-content iframe');
      if (previewIframe) {
        const htmlContent = currentAssignment.code.html || '';
        const cssContent = currentAssignment.code.css || '';
        const jsContent = currentAssignment.code.js || '';
        
        const iframeContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>${cssContent}</style>
            </head>
            <body>
              ${htmlContent}
              <script>${jsContent}</script>
            </body>
          </html>
        `;
        
        const blob = new Blob([iframeContent], { type: 'text/html' });
        previewIframe.src = URL.createObjectURL(blob);
      }
    }
    
    // Setup copy buttons
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
      button.addEventListener('click', function() {
        const codeElement = this.closest('.code-block').querySelector('code');
        const textarea = document.createElement('textarea');
        textarea.value = codeElement.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        // Change button text temporarily
        const originalText = this.textContent;
        this.textContent = 'Skopiowano!';
        setTimeout(() => {
          this.textContent = originalText;
        }, 2000);
      });
    });
  } else {
    // Assignment not found
    document.body.innerHTML = `
      <div class="container">
        <h1>Zadanie nie znalezione</h1>
        <p>Zadanie o podanym ID nie istnieje.</p>
        <a href="archive.html" class="back-link">Wróć do archiwum</a>
      </div>
    `;
  }
}
