document.querySelector('button').addEventListener('click', () => {
  const text = document.querySelector('textarea').value;
  if (text.trim() === '') return;

  const tweetDiv = document.createElement('div');
  tweetDiv.className = 'tweet';
  tweetDiv.textContent = text;

  document.querySelector('.tweets').prepend(tweetDiv);
  document.querySelector('textarea').value = '';
});