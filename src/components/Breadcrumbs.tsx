import React from 'react'
import styled from 'styled-components';
import { FiChevronRight } from 'react-icons/fi'

export interface BreadcrumbsProps {
  items?: string[]
}

function Breadcrumbs({ items, ...props }: BreadcrumbsProps) {

  return (
    <div className="limiter">
      <div {...props}>
        {items?.map((breadcrumb, index) => (
          <div key={`breadcrumb-${index}`}>
            {(index > 0) && <span className='spacer'><FiChevronRight /></span>}
            <span className={index === items.length - 1 ? 'active' : ''}>{breadcrumb}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default styled(Breadcrumbs)`
  padding: 1rem 0;
  display: flex;
  vertical-align: bottom;
  color: #999999;


  .active {
    font-weight: bold;
  }

  .spacer {
    padding: 0 0.25rem;
  }
`;