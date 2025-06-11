document.querySelectorAll('.nav-links li a').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty('--x', x + 'px');
    btn.style.setProperty('--y', y + 'px');
  });
  btn.addEventListener('mouseleave', function() {
    btn.style.setProperty('--x', '50%');
    btn.style.setProperty('--y', '50%');
  });
}); 