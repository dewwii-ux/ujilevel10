const defaultAvatar = 'https://i.pravatar.cc/80?img=12';
 
  function uploadAvatar(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById('avatar-img').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
 
  function removeAvatar() {
    document.getElementById('avatar-img').src = 'https://ui-avatars.com/api/?name=James+McDowell&background=e2e8f0&color=64748b&size=80';
  }
 
  function toggleConnect(btn) {
    if (btn.textContent.trim() === 'Connect') {
      btn.textContent = 'Disconnect';
      btn.className = 'border border-gray-300 text-gray-500 hover:bg-gray-50 text-sm font-medium px-5 py-1.5 rounded-md transition';
      showToast('Google account connected!');
    } else {
      btn.textContent = 'Connect';
      btn.className = 'border border-blue-500 text-blue-500 hover:bg-blue-50 text-sm font-medium px-5 py-1.5 rounded-md transition';
      showToast('Google account disconnected.');
    }
  }
 
  function confirmDelete() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      showToast('Account deletion requested.');

    setTimeout(() => {
      window.location.href = "/view/login.html";
    }, 1000);
    }
  }
 
  function saveChanges(btn) {
    btn.textContent = 'Saving...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Save changes';
      btn.disabled = false;
      showToast('Changes saved successfully!');
    }, 900);
  }
 
  function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.remove('hidden');
    toast.classList.add('flex');
    setTimeout(() => {
      toast.classList.add('hidden');
      toast.classList.remove('flex');
    }, 2500);
  }