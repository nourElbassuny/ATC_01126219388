package com.areeb.Areeb.event.dto;

import com.areeb.Areeb.event.entity.Event;

import java.util.List;

public record PaginatedEvent<T>(
        List<T> content,
        int currentPage,
        int totalPage,
        long totalsItems,
        boolean hasNext,
        boolean hasPrevious,
        String nextPageUsl,
        String previousPageUrl
) {
}
