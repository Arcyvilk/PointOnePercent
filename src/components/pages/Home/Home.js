import React from 'react'
import { connect } from 'react-redux';

class PageHome extends React.Component{
    render() {
        const { props } = this
        return (
            <div>
                {
                    props.blog.map((entry, entryIndex) => 
                        <div className='blog-entry' key={ `entry-${entryIndex}` }>
                            <h1>
                                { entry.title}
                            </h1>
                            <h2>
                                ~{ entry.author }, { new Date(entry.date).toLocaleDateString() }
                            </h2>
                            <p>{ entry.content }</p>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({ 
    blog: state.blog 
})

export default connect(
    mapStateToProps
)( PageHome )