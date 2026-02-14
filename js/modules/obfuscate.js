
function _d(s) {
    return atob(s).split('').reverse().join('');
}

const _c = [
    'bm9maWxh',
    'b3BvYw==',
    'YW5pbG9yYWMgYWw=',
    'ZXRhZA==',
    'eWxp',
    'b2tveQ=='
];

const _a = {
    1: 'b3RpcG9j'
};

export function getCodes() {
    return [
        { code: _d(_c[0]) },
        { code: _d(_c[1]), alt: _d(_a[1]) },
        { code: _d(_c[2]) },
        { code: _d(_c[3]) },
        { code: _d(_c[4]) },
        { code: _d(_c[5]) }
    ];
}

export function checkCode(input, codeIndex) {
    const codes = getCodes();
    const targetCode = codes[codeIndex];

    if (!targetCode) return false;

    const normalized = input.toLowerCase().trim();

    if (normalized === targetCode.code) return true;
    if (targetCode.alt && normalized === targetCode.alt) return true;

    return false;
}
