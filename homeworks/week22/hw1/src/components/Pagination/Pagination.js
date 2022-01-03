import styled from '@emotion/styled/macro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faChevronLeft as faLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight as faRight } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisH as faEtc } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fab)

const PageUl = styled.ul`
  display: flex;
  justify-content: center;
  margin: .4rem 0;
`

const Li = styled.li`
  color: #428bca;
  font-size: .7rem;
  font-weight: 500;
  border: 1px solid transparent;
  width: 30px;
  height: 30px;
  line-height: 28px;
  text-align: center;
  user-select: none;
  margin-left: 8px;

  path {
    color: #428bca;
  }
`

const PageLi = styled(Li)`
  border: 1px solid #428bca;
  border-radius: 6px;
  box-shadow: 1px 1px #ccc;
  cursor: pointer;
  transition: transform .3s;


  ${({ $active }) => $active && `
    color: #eee;
    background: #428bca;
    border-color: #eee;
    transform: translate(0px, -2px);
    path {
      color: #eee;
    }
  `}

  &:hover {
    color: #eee;
    background: #428bca;
    border-color: #eee;
    path {
      color: #eee;
    }
  }

  ${({ $hide }) => $hide && `
    visibility: hidden;
  `}
`

const Pagination = ({
  totalPage,
  currentPage = 1,
  setCurrentPage,
}) => {
  const pageNumArray = Array.from({ length: totalPage }, (_, i) => i + 1)
  const offsetArray = (() => {
    if (currentPage < 6) return pageNumArray.slice(0, 6)
    else if (currentPage > totalPage - 5) return pageNumArray.slice(totalPage - 6)
    else return pageNumArray.slice(currentPage - 2, currentPage + 1)
  })()

  const PageLiItem = ({ value }) => (
    <PageLi
      $active={currentPage === value}
      onClick={() => setCurrentPage(value)}>
      {value}
    </PageLi>
  )

  return (
    <PageUl>
      <PageLi $hide={currentPage <= 1} onClick={() => setCurrentPage(value => --value)}>
        <FontAwesomeIcon icon={faLeft} />
      </PageLi>
      {totalPage < 11 && pageNumArray.map((i) => <PageLiItem key={`pageLi-${i}`} value={i} />)}
      {totalPage >= 11 && (
        <>
          {
            currentPage > 5 && (<>
              <PageLiItem key={`pageLi-1`} value={1} />
              <PageLiItem key={`pageLi-2`} value={2} />
              <Li><FontAwesomeIcon icon={faEtc} /></Li>
            </>)
          }
          {offsetArray.map((i) => <PageLiItem key={`pageLi-${i}`} value={i} />)}
          {
            currentPage <= totalPage - 5 && (<>
              <Li><FontAwesomeIcon icon={faEtc} /></Li>
              <PageLiItem key={`pageLi-${totalPage - 1}`} value={totalPage - 1} />
              <PageLiItem key={`pageLi-${totalPage}`} value={totalPage} />
            </>)
          }

        </>
      )}
      <PageLi $hide={currentPage >= totalPage} onClick={() => setCurrentPage(value => ++value)}>
        <FontAwesomeIcon icon={faRight} />
      </PageLi>
    </PageUl>
  )
}

export default Pagination
