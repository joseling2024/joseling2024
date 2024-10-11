let isDarkMode = false;
let currentFontSize = 16;

function adjustFontSize(sizeChange) {
    currentFontSize += sizeChange;
    currentFontSize = Math.max(12, currentFontSize);
    document.body.style.fontSize = currentFontSize + 'px';
}

document.getElementById('increase-font').addEventListener('click', () => {
    adjustFontSize(2);
});

document.getElementById('decrease-font').addEventListener('click', () => {
    adjustFontSize(-2);
});

document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

const apiUrl = 'https://api.scripture.api.bible/v1/bibles/48acedcf8595c754-01/books';
const apiKey = '7c3beddffc297075b0a64d2a94b2f602';

const oldTestamentBooks = [
    'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA',
    '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO',
    'ECC', 'SNG', 'ISA', 'JER', 'LAM', 'EZE', 'DAN', 'HOS', 'JOE', 'AMO',
    'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL'
];

const newTestamentBooks = [
    'MAT', 'MAR', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH',
    'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS',
    '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV'
];

async function fetchBooks() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los libros de la Biblia');
        }

        const data = await response.json();
        const books = data.data;

        const oldTestament = books.filter(book => oldTestamentBooks.includes(book.id));
        const newTestament = books.filter(book => newTestamentBooks.includes(book.id));

        displayBooks('Antiguo Testamento', oldTestament);
        displayBooks('Nuevo Testamento', newTestament);
    } catch (error) {
        document.getElementById('loading').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayBooks(testamentName, books) {
    const contentDiv = document.getElementById('content');
    const testamentDiv = document.createElement('div');
    testamentDiv.classList.add('testament');
    testamentDiv.innerHTML = `<h2>${testamentName}</h2>`;
    contentDiv.appendChild(testamentDiv);

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `<h3>${book.name}</h3><div class="chapters"></div>`;
        testamentDiv.appendChild(bookDiv);

        bookDiv.querySelector('h3').addEventListener('click', () => {
            const chaptersDiv = bookDiv.querySelector('.chapters');
            chaptersDiv.classList.toggle('show');
            if (chaptersDiv.classList.contains('show')) {
                fetchChapters(book.id, chaptersDiv);
            }
        });
    });
}

async function fetchChapters(bookId, chaptersDiv) {
    const chaptersUrl = `https://api.scripture.api.bible/v1/bibles/48acedcf8595c754-01/books/${bookId}/chapters`;

    try {
        const response = await fetch(chaptersUrl, {
            method: 'GET',
            headers: {
                'api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los capítulos');
        }

        const data = await response.json();
        const chapters = data.data;

        chaptersDiv.innerHTML = '';
        chapters.forEach(chapter => {
            const chapterDiv = document.createElement('div');
            chapterDiv.classList.add('chapter');
            chapterDiv.innerHTML = `<a class="chapter-title" href="#">${chapter.reference}</a>`;
            chaptersDiv.appendChild(chapterDiv);

            chapterDiv.querySelector('.chapter-title').addEventListener('click', (event) => {
                event.preventDefault();
                fetchChapterContent(chapter.id);
            });
        });
    } catch (error) {
        chaptersDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

async function fetchChapterContent(chapterId) {
    const chapterUrl = `https://api.scripture.api.bible/v1/bibles/48acedcf8595c754-01/chapters/${chapterId}`;

    try {
        const response = await fetch(chapterUrl, {
            method: 'GET',
            headers: {
                'api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener el contenido del capítulo');
        }

        const data = await response.json();
        const chapterContent = data.data.content;

        const detailsDiv = document.getElementById('details');
        const detailsContentDiv = document.getElementById('details-content');
        detailsContentDiv.innerHTML = chapterContent;
        detailsDiv.style.display = 'block';

        detailsDiv.querySelector('.close').addEventListener('click', () => {
            detailsDiv.style.display = 'none';
        });
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

fetchBooks();
