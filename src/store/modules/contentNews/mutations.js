export const mutations = {
        setNewsResult(state, {data, allNewsLength}) {
            return state = Object.assign(state, {result: data, allNewsLength: allNewsLength, loading: false})
        },
        setNewsType(state, type) {
            return state = Object.assign(state, {
                newsUrlParam: type === 'in world' ? 'top-headlines?sources=bbc-news,the-next-web,the-verge' : `top-headlines?category=${type}`,
                activePage: 1,
                pageNumberParam: 1
            });
        },
        changeSearchParam(state, newTypeParam) {
            return state = Object.assign(state, {
                newsUrlParam: newTypeParam,
                activePage: 1,
                pageNumberParam: 1
            });
        },
        setPageNumber(state, page) {
            return state.pageNumberParam = page;
        }
        ,
        setPagesAmount(state) {
            let newsLength = state.allNewsLength;
            let pagesAmount = Math.ceil(newsLength / 20);
            let pages = [];
            if (pagesAmount < 6) {
                for (let i = 1; i <= pagesAmount; i++) {
                    pages.push(i)
                }
            } else {
                for (let i = 1; i <= 6; i++) {
                    pages.push(i);
                }
            }

            return state.pages = pages;
        }
        ,
        setActivePage(state, page) {
            return state.activePage = page;
        },
        changePagesValue(state, arrayOfPages) {
            return state.pages = arrayOfPages
        }
    }
;
