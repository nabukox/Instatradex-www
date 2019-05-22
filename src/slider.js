import './css/slider.scss';
import './css/icomoon.css';

const UNSENT = 0;
const OPENED = 1;
const HEADERS_RECEIVED = 2;
const LOADING = 3;
const DONE = 4;

const getHandler = (url) => (resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        switch (xhr.readyState) {
        case UNSENT:
        case OPENED:
        case HEADERS_RECEIVED:
        case LOADING:
            break;
        case DONE:
            if (xhr.status === 200) {
                const { data, status } = JSON.parse(xhr.responseText);
                if (status.error_code === 0) {
                    resolve(data);
                } else {
                    reject();
                }
            } else {
                reject();
            }
        }
    };
    xhr.send();
};

const get = async (url) => new Promise(getHandler(url));
const listCoins = async () => get('/api/coins');

const createElement = (type, options) => {
    const element = document.createElement(type);
    for (const key of Object.getOwnPropertyNames(options)) {
        switch (key) {
        case 'className':
            element.setAttribute('class', `crypto-slider-${options[key]}`);
            break;
        case 'text':
            element.appendChild(document.createTextNode(options.text));
            break;
        case 'children':
            for (const child of options.children)
                element.appendChild(child);
            break;
        case 'eventHandlers':
            for (const event of Object.getOwnPropertyNames(options.eventHandlers)) {
                const handler = options.eventHandlers[event];
                const internalHandler = async () => {
                    // While handling the event, disable the event
                    element.removeEventListener(event, internalHandler);
                    // Wait for the handler to finish
                    await handler();
                    // Now reinstall the handler
                    element.addEventListener(event, internalHandler);
                };
                element.addEventListener(event, internalHandler);
            }
            break;
        default:
            if (key.startsWith('data')) {
                const normalized = key
                    .split(/(?=[A-Z])/)
                    .join('-')
                    .toLowerCase();
                element.setAttribute(normalized, options[key]);
            } else {
                element.setAttribute(key, options[key]);
            }
        }
    }
    return element;
};

const addHeader = (card, item) => {
    card.appendChild(createElement('div', {
        children: [
            createElement('div', { className: 'symbol', text: item.symbol }),
            createElement('div', { className: 'name', text: item.name }),
        ],
        className: 'header',
    }));
};

const populateChart = (canvas, { quotes: entries }) => {
    const context = canvas.getContext('2d');
    // Get vertical bounds
    const max = entries.reduce((value, { quote: { USD: { price } } }) => price > value ? price : value, 0);
    const min = entries.reduce((value, { quote: { USD: { price } } }) => price < value ? price : value, -(1 << 31));
    // Compute the global vertical scale
    const scale = canvas.height / (max - min);
    let x = 0;
    const addPoint = ({ quote: { USD: { price } } }) => {
        const value = (price - min) * scale;
        // Draw a line now
        context.lineTo(x, value);
        // Advance uniformly
        return x + canvas.width / entries.length;
    };
    const midPoint = entries.length / 2;

    context.beginPath();
    context.fillStyle = '#ddd';
    for (let index = 0; index < 20; ++index) {
        context.ellipse(index * canvas.width / 20, canvas.height / 2, 3, 3, 0, 0, 2 * Math.PI, false);
    }
    context.fill();

    context.lineWidth = 2;

    context.beginPath();
    context.strokeStyle = '#666';
    for (const entry of entries.slice(0, midPoint))
        x = addPoint(entry);
    context.stroke();

    context.beginPath();
    context.strokeStyle = '#67B4FC';
    for (const entry of entries.slice(midPoint))
        x = addPoint(entry);
    context.stroke();
};

const addChart = (card, item) => {
    const canvas = createElement('canvas', { className: 'chart' });
    const chart = createElement('div', {
        className: 'canvas-container loading',
        children: [canvas],
    });
    get(`/api/history/${item.id}`)
        .then((data) => {
            populateChart(canvas, data);
            removeClass(chart, 'loading');
        })
    ;
    card.appendChild(chart);
};

const formatCurrency = (value) => {
    const numeric = Number(value);
    if (isNaN(numeric))
        return undefined;
    return '$' + numeric.toFixed(2);
};

const getNumericValueClass = (value) => {
    if (value === 0) {
        return 'neutral';
    } else if (value > 0) {
        return 'positive';
    } else {
        return 'negative';
    }
};

const formatPercentage = (value) => `${value.toFixed(2)}%`;

const addBottomPanel = (card, item) => {
    const { quote: { USD } } = item;
    card.appendChild(createElement('div', {
        className: 'price-panel',
        children: [
            createElement('div', {
                text: formatCurrency(USD.price),
                className: 'price',
            }),
            createElement('div', {
                children: [
                    createElement('span', {
                        text: formatPercentage(USD.percent_change_1h),
                        className: getNumericValueClass(USD.percent_change_1h),
                    }),
                ],
                className: 'change',
            }),
        ],
    }));
};

const addButtons = (card, item) => {
    card.appendChild(createElement('div', {
        className: 'buttons',
        children: [
            createElement('div', {
                className: 'button',
                children: [createElement('button', {
                    text: 'Vender',
                })]
            }),
            createElement('div', {
                className: 'button',
                children: [createElement('button', {
                    text: 'Comprar',
                })]
            }),
        ],
    }));
};

const createCard = (item, promise) => {
    const card = createElement('div', {
        className: 'card',
        dataSymbol: item.symbol
    });
    promise.then(() => {
        // Add the header
        addHeader(card, item);
        // Now the chart
        addChart(card, item);
        // The panel just below the chart
        addBottomPanel(card, item);
        // The buttons
        addButtons(card, item);
    });
    return card;
};

const easeOutBounce = (t) => -t * (t - 2);

const animate = async (start, end, duration, render) => {
    return new Promise((resolve) => {
        const total = 100;
        const next = (frame) => {
            setTimeout(() => {
                if (frame <= total) {
                    render(start + easeOutBounce(frame / total) * (end - start));
                    next(frame + 1);
                } else {
                    resolve();
                }
            }, duration / 100);
        };
        next(0);
    });
};

const createPageNavigators = (id, fractional) => {
    const count = Math.ceil(fractional);
    const array = [];
    while (array.length < count) {
        const page = array.length;
        array.push(createElement('div', {
            className: 'page',
            eventHandlers: {
                click: () => setCurrentPage(id, page),
            },
            dataPage: page,
        }));
    }
    return array;
};

const generateId = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const result = [];
    while (result.length < 30) {
        result.push(charset[Math.floor(Math.random() * charset.length)]);
    }
    return result.join('');
};

const setScrollLeft = async (target, value) => {
    const update = (value) => target.scrollLeft = value;
    // Start the animation
    return animate(target.scrollLeft, value, 500, update);
};

const removeClass = ({ classList }, name) => classList.remove(name);
const addClass = ({ classList }, name) => classList.add(name);

const setCurrentPage = async (id, page) => {
    const scrollable = document.getElementById(id);
    const content = scrollable.querySelector('.crypto-slider-content');
    const buttons = scrollable.querySelectorAll('button.crypto-slider-arrow');
    const indicator = scrollable.querySelector(`[data-page="${page}"]`);
    const active = scrollable.querySelector('.crypto-slider-page.active');

    if (!content)
        throw new Error('this is not scrollable, are you kidding me?');
    const finalPosition = page * content.offsetWidth;
    for (const button of buttons)
        button.disabled = true;
    if (finalPosition < 0) {
        await setScrollLeft(content, 0);
    } else if (finalPosition >= content.scrollWidth) {
        await setScrollLeft(content, content.scrollWidth);
    } else {
        await setScrollLeft(content, finalPosition);
    }
    for (const button of buttons)
        button.disabled = false;
    if (active !== null)
        removeClass(active, 'active');
    addClass(indicator, 'active');
};

const getCurrentPage = (id) => {
    const scrollArea = document.getElementById(id);
    const content = scrollArea.querySelector('.crypto-slider-content');
    // Simple computation of the "page"
    return content.scrollLeft / content.offsetWidth;
};

const ACTIVE_CRYPTO_TAB_CLASS = 'active-crypto-tab';

const activateCryptoTab = (hash) => {
    const active = document.querySelector(`.${ACTIVE_CRYPTO_TAB_CLASS}`);
    // Get activated link
    const link = document.querySelector(hash);
    if (active) {
        removeClass(active, ACTIVE_CRYPTO_TAB_CLASS);
    }
    if (link) {
        addClass(link, ACTIVE_CRYPTO_TAB_CLASS);
    }
};

const slideForward = (id) => setCurrentPage(id, getCurrentPage(id) + 1);
const slideBack = (id) => setCurrentPage(id, getCurrentPage(id) - 1);
const installSliderFromData = (slider, data) => {
    const id = generateId();
    const mounted = (resolve) => {
        if (typeof resolve === 'function') {
            resolve();
        }
    };
    const wrapper = createElement('div', {
        id: id,
        children: [
            createElement('ul', {
                className: 'tabs',
                children: [
                    createElement('li', {
                        children: [
                            createElement('a', {
                                text: 'Forex',
                                id: 'forex',
                                href: '#forex'
                            })
                        ]
                    }),
                    createElement('li', {
                        children: [
                            createElement('a', {
                                text: 'Cryptocurrencies',
                                id: 'cryptocurrencies',
                                href: '#cryptocurrencies'
                            })
                        ]
                    }),
                    createElement('li', {
                        children: [
                            createElement('a', {
                                text: 'Commodities',
                                id: 'commodities',
                                href: '#commodities'
                            })
                        ]
                    }),
                    createElement('li', {
                        children: [
                            createElement('a', {
                                text: 'Indices',
                                id: 'indices',
                                href: '#indices'
                            })
                        ]
                    })
                ]
            }),
            createElement('button', {
                className: 'arrow left',
                children: [
                    createElement('span', {
                        text: '\uf104',
                    })
                ],
                eventHandlers: {
                    click: () => slideBack(id),
                }
            }),
            createElement('div', {
                className: 'content',
                children: data.map((card) => createCard(card, new Promise(mounted))),
            }),
            createElement('button', {
                className: 'arrow right',
                children: [
                    createElement('span', {
                        text: '\uf105',
                    })
                ],
                eventHandlers: {
                    click: () => slideForward(id),
                }
            }),
            createElement('div', {
                className: 'pager',
                children: createPageNavigators(id, data.length / 4),
            })
        ],
    });
    const parent = slider.parentNode;
    // Replace the old non html tag with a html one
    parent.replaceChild(wrapper, slider);
    // Set the class manually
    wrapper.setAttribute('class', 'crypto-slider');
    // noinspection JSIgnoredPromiseFromCall
    setCurrentPage(id, 0);
    // Call mounted to resolve the promise
    const { hash } = window.location;
    window.addEventListener('hashchange', (event) => {
        const { hash } = window.location;
        // First of all ignore this
        event.preventDefault();
        // Activate crypto tab
        activateCryptoTab(hash);
    });
    activateCryptoTab(hash);
    mounted();
};

window.addEventListener('load', () => {
    listCoins()
        .then((data) => {
            const slider = document.getElementsByTagName('crypto-slider');
            if (slider === null)
                return;
            installSliderFromData(slider[0], data);
        })
    ;
});

