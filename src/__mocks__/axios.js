export default {
    get: jest.fn(() =>
        Promise.resolve({
            status: 'mockStatus',
            data: 'mocked'
        })
    ),
    post: jest.fn(() =>
        Promise.resolve({
            status: 'mockStatus',
            data: 'mocked'
        })
    ),
    put: jest.fn(() =>
        Promise.resolve({
            status: 'mockStatus',
            data: 'mocked'
        })
    ),
    patch: jest.fn(() =>
        Promise.resolve({
            status: 'mockStatus',
            data: 'mocked'
        })
    ),
    delete: jest.fn(() =>
        Promise.resolve({
            status: 'mockStatus',
            data: 'mocked'
        })
    )
};
