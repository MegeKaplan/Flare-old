
document.addEventListener('DOMContentLoaded', async () => {
    const likeButtons = document.querySelectorAll('.likeBtn');
    const likeCountEls = document.querySelectorAll('.likeCount');
    likeButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const postId = e.target.getAttribute('data-id');
            const likePostRes = await fetch(`/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId })
            });
        
        
            if (likePostRes.ok) {
                const postData = await likePostRes.json();

                // const likeCountSpan = document.querySelector(`#post-${postId} .like-count`);
                // likeCountSpan.textContent = result.likeCount;

                // get current user
                // http://localhost:3000/users/current
                var getCurrentUserRes = await fetch(`users/current`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const currentUser = await getCurrentUserRes.json()

                if(getCurrentUserRes.ok){
                    console.log("U", currentUser.likes);
                    console.log("P", postData.likes);
                    const isUserLikesIncludesPostId = currentUser.likes.includes(postData.$id);
                    const isPostLikesIncludesUserId = postData.likes.includes(currentUser.$id);

                    const isUserLiked = isUserLikesIncludesPostId & isPostLikesIncludesUserId

                    console.log(
                        isUserLikesIncludesPostId,
                        isPostLikesIncludesUserId,
                        isUserLiked
                    );
                    

                    if(!isPostLikesIncludesUserId){
                        e.target.classList.add("text-red-400")
                        likeCountEls.forEach(el => {
                            if(el.getAttribute('data-id') == postId){
                                el.innerText = Number(el.innerText) + 1
                            }
                        })
                    }else{
                        e.target.classList.remove("text-red-400")
                        likeCountEls.forEach(el => {
                            if(el.getAttribute('data-id') == postId){
                                el.innerText = Number(el.innerText) - 1
                            }
                        })
                    }
                }
            } else {
                alert('An error occured!');
            }
        });
    });
});