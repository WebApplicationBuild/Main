import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProjectData } from '../store/MatchingDataProvider';
//import { matchingPosts } from '../api/mockData';

function useMatchingPageData() {
  const [searchParams] = useSearchParams();
  // URL 쿼리(postId) 기반으로 특정 게시글을 열거나 스크롤할 때 사용
  const postIdFromUrl = Number(searchParams.get('postId'));

  // MatchingPage 화면 상태를 훅으로 분리해 UI 컴포넌트는 렌더링에만 집중하도록 구성
  const [isWritingMode, setIsWritingMode] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const {
    matchingPostsData: posts,
    setMatchingPostsData: setPosts,
    matchingActiveCategories: activeCategories,
    setMatchingActiveCategories: setActiveCategories,
    matchingSearchTerm: searchTerm,
    setMatchingSearchTerm: setSearchTerm,
    setMatchingSearchTerm,
  } = useProjectData();
  
  function joinProject(postId, userId) {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        return {
          ...post,
          memberIds: [...(post.memberIds || []), userId],
          appliedMembers: (post.appliedMembers || 0) + 1,
        };
      })
    );
  }

  // 우선순위: 직접 클릭한 게시글(selectedPostId) -> URL postId -> 없음(null)
  const selectedPost = useMemo(
    () =>
      posts.find((post) => post.id === selectedPostId) ||
      posts.find((post) => post.id === postIdFromUrl) ||
      null,
    [posts, postIdFromUrl, selectedPostId]
  );

  useEffect(() => {
    document.title = "TeaMo | 팀 매칭";
  }, []);

  useEffect(() => {
    if (!postIdFromUrl) return;

    const targetPost = posts.find((post) => post.id === postIdFromUrl);
    if (!targetPost) return;

    // 게시글 DOM 렌더 완료 후 부드럽게 해당 위치로 이동
    const timerId = setTimeout(() => {
      const element = document.getElementById(`post-${postIdFromUrl}`);
      if (!element) return;

      const y = element.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 300);

    return () => clearTimeout(timerId);
  }, [postIdFromUrl, posts]);

  const addPost = (newPost) => {
    // 최신 글이 상단에 보이도록 prepend
    setPosts((prev) => [newPost, ...prev]);
    setIsWritingMode(false);
  };

  const handleCategoryClick = (cat) => {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat]
    );
  };

  const togglePostSelection = (post) => {
    setSelectedPostId((prevId) => (prevId === post.id ? null : post.id));
  };

  const filteredAndSortedPosts = useMemo(() => {
    // 검색어 필터링 후, 카테고리/검색어 매칭 점수 기준으로 정렬
    return [...posts]
      .filter((post) => {
        if (!searchTerm.trim()) return true;

        const lowerSearchTerm = searchTerm.toLowerCase();
        const titleMatch = post.title?.toLowerCase().includes(lowerSearchTerm);
        const contentMatch = post.content?.toLowerCase().includes(lowerSearchTerm);
        return titleMatch || contentMatch;
      })
      .sort((a, b) => {
        const aCategoryMatchCount =
          activeCategories.length > 0
            ? activeCategories.filter((cat) => String(a.category).includes(cat)).length
            : 0;
        const bCategoryMatchCount =
          activeCategories.length > 0
            ? activeCategories.filter((cat) => String(b.category).includes(cat)).length
            : 0;

        let aSearchScore = 0;
        let bSearchScore = 0;

        if (searchTerm.trim()) {
          const lowerSearchTerm = searchTerm.toLowerCase();

          if (a.title?.toLowerCase().includes(lowerSearchTerm)) aSearchScore += 2;
          else if (a.content?.toLowerCase().includes(lowerSearchTerm)) aSearchScore += 1;

          if (b.title?.toLowerCase().includes(lowerSearchTerm)) bSearchScore += 2;
          else if (b.content?.toLowerCase().includes(lowerSearchTerm)) bSearchScore += 1;
        }

        const aTotalScore = aCategoryMatchCount + aSearchScore;
        const bTotalScore = bCategoryMatchCount + bSearchScore;

        return bTotalScore - aTotalScore;
      });
  }, [activeCategories, posts, searchTerm]);

  return {
    isWritingMode,
    setIsWritingMode,
    selectedPost,
    activeCategories,
    searchTerm,
    setSearchTerm,
    addPost,
    handleCategoryClick,
    filteredAndSortedPosts,
    togglePostSelection,
    joinProject,
  };
}

export default useMatchingPageData;
