import React from 'react'

const customDate = (date) =>{
    let rdate = new Date(date)
    var rObj = {
        time: rdate.toLocaleString('en-IN',{hour:'numeric',minute:'numeric',hour12:true}),
        day: rdate.toLocaleString('en-IN',{weekday : 'long'})
    }
    const rTime = `${rObj.time} // ${rObj.day}`
    console.log(rObj)
    return rTime
}

const Posts = ({ posts }) => {
    if(posts[0]){
    return (
        <div>
            {
                posts.map((post) =>
                    <div className="card horizontal">
                        <div className="card-stacked">
                            <div className="card-content">
                                <p>{post.text}</p>
                            </div>
                            <div className="card-action">
                                {customDate(post.postedOn)}
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )}else{
        return(
            <div>
                <h6>No new posts.....</h6>
            </div>
        )
    }}

export default Posts;

