export function showLoadingView(): void {
  const circle = document.getElementById('app-loading-circle');

  if (circle) {
    circle.className = 'prepare';

    setTimeout(() => {
      circle.className = 'show';
    }, 50);
  }
}


export function hideLoadingView(): void {
  const circle = document.getElementById('app-loading-circle');

  if (circle) {
    circle.className = 'prepare';

    setTimeout(() => {
      circle.className = '';
    }, 500);
  }
}
