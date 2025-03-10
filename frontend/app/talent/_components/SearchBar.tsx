'use client'
import { useState, useEffect, useRef } from 'react'
import { searchChallenges } from '@/app/actions/challenges'
import { Challenge } from '@/app/types/challenge'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatTitle } from '@/lib/utils'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Challenge[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const searchBarRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const router = useRouter();

  // Handle click outside the search bar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false)
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen, searchTerm])

  // Focus input when search bar is open, clear when closed
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen])

  // Debounced search functionality
  useEffect(() => {
    setIsLoading(true)
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm) {
        await searchInstant(searchTerm)
      } else {
        setSearchResults([])
        setIsLoading(false)
      }
    }, 500) // Adjust debounce timing as necessary

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  // Search challenges
  const searchInstant = async (term: string) => {
    // Cancel previous request
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
    setSearchResults([])
    const controller = new AbortController()
    const signal = controller.signal
    controllerRef.current = controller

    if (!term) return

    // await new Promise(resolve => setTimeout(resolve, 2000))
    try {
      const results = await searchChallenges(term, null) // Replace with actual token logic
      setSearchResults(results.slice(0, 5)) // Limit results to 5
      setIsLoading(false)
    } catch (error) {
      if (controller.signal.aborted) {
        console.log('Search aborted')
      } else {
        console.error('Error searching:', error)
        setSearchResults([])
      }
      setIsLoading(false)
    }
  }

  const handleSelectResult = () => {
    setIsSearchOpen(false)
  };

  return (
    <div ref={searchBarRef} className="bg-gray-50 relative shadow-sm h-fit w-1/2 flex flex-col items-start p-1 pl-3 space-y-2 rounded-md">
      <div className="flex items-center w-full space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          ref={inputRef}
          className="bg-gray-50 h-6 w-full outline-none ring-0 focus:ring-0 focus:outline-none text-sm"
          type="text"
          placeholder="Search challenges"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
        />
      </div>

      {isSearchOpen && searchTerm && (
        <div className="bg-gray-50 absolute top-full w-full mt-2 left-0 rounded-md overflow-hidden shadow-md">
          {isLoading ? (
            <div className="text-sm text-gray-500 px-4 py-4">Searching...</div>
          ) : searchResults.length > 0 ? searchResults.map((challenge) => (
            <Link
              href={`/talent/challenges/${challenge._id}/${formatTitle(challenge.title)}`}
              key={challenge._id}
              className="hover:bg-gray-100 flex items-center px-4 py-4 border-t border-gray-200"
              onClick={handleSelectResult}
            >
              <Image
                src={typeof challenge.imageUrl === "string" ? challenge.imageUrl : URL.createObjectURL(challenge.imageUrl)}
                alt={challenge.title}
                className="h-12 w-12 rounded-md object-cover mr-3"
                width={100}
                height={100}
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{challenge.title}</span>
                <span className="text-xs text-gray-500">Due: {new Date(challenge.deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
            </Link>
          ))
            : searchResults.length === 0 && !isLoading && <div className="text-sm text-gray-500 px-4 py-4">No results found for "{searchTerm}"</div>
          }
        </div>
      )}
    </div>
  )
}

export default SearchBar
