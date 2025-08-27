document.addEventListener('DOMContentLoaded', function() {
  // 获取所有带有下拉功能的导航项
  const dropdowns = document.querySelectorAll('.navbar .dropdown');

  // 为每个下拉菜单项添加点击事件监听器
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    // 监听下拉按钮的点击事件
    toggle.addEventListener('click', function(event) {
      // 阻止默认的链接跳转行为
      event.preventDefault();
      // 阻止事件冒泡，防止点击后菜单立刻关闭
      event.stopPropagation();

      // 切换当前菜单的 active 状态
      dropdown.classList.toggle('active');

      // 关闭所有其他已展开的菜单
      dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
          otherDropdown.classList.remove('active');
        }
      });
    });
  });

  // 监听整个文档的点击事件
  document.addEventListener('click', function(event) {
    // 如果点击的不是下拉菜单的任意部分，就关闭所有菜单
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(event.target) && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
      }
    });
  });

});